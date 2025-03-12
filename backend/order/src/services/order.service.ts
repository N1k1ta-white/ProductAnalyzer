import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProdReqDto, OrderReqDto } from 'src/dto/orderReq.dto';
import { Order } from 'src/entities/order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderStatus } from 'src/util/order-status.enum';

const CHECK_AVAILABILITY_AND_BUY = "checkAvailabilityAndBuy"
const FETCH_PRICES = "fetchPrices"

interface ProductRequest {
    productId: number;
    quantity: number;
}

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @Inject('PRODUCT_SERVICE') private readonly orderClient: ClientProxy
    ) {}

    private mapToProductRequest(products: OrderProdReqDto[]) {
        return products.map(product => ({
            productId: product.id,
            quantity: product.quantity ?? 1
        }));
    }

    private async fetchProductPrices(products: ProductRequest[]) {
        try {
            return await firstValueFrom(
                this.orderClient.send(FETCH_PRICES, 
                    products.map(product => product.productId))
            );
        } catch (error) {
            throw new BadRequestException(`Failed to get bill: ${error.message}`);
        }
    }

    private async checkAvailabilityAndPurchase(products: ProductRequest[]) {
        try {
            await firstValueFrom(this.orderClient.send(CHECK_AVAILABILITY_AND_BUY, products));
        } catch (error) {
            throw new BadRequestException(`Failed to check availability and buy: ${error.message}`);
        }
    }

    private createPriceMap(prices: {productId: number, price: number}[]) {
        return new Map(prices.map(price => [price.productId, price.price]));
    }

    private calculateTotalSum(products: ProductRequest[], priceMap: Map<number, number>) {
        return products.reduce((sum, product) => 
            sum + product.quantity * (priceMap.get(product.productId) ?? 0), 0);
    }

    private createOrderEntity(orderDto: OrderReqDto, products: ProductRequest[],
         priceMap: Map<number, number>, totalSum: number) {
        return this.orderRepository.create({
            customer: orderDto.customerId,
            products: orderDto.products.map(product => ({
                productId: product.id,
                quantity: product.quantity,
                price: priceMap.get(product.id)
            })),
            totalSum,
            status: OrderStatus.IN_PROGRESS,
        });
    }

    async createOrder(orderDto: OrderReqDto) {
        const products = this.mapToProductRequest(orderDto.products);
        const prices = await this.fetchProductPrices(products);
        await this.checkAvailabilityAndPurchase(products);
        
        const priceMap = this.createPriceMap(prices);
        const totalSum = this.calculateTotalSum(products, priceMap);
        
        const order = this.createOrderEntity(orderDto, products, priceMap, totalSum);
        return this.orderRepository.save(order);
    }

    async getOrdersByCustomer(customerId: number) {
        return this.orderRepository.find({ where: { customer: customerId } });
    }
}
