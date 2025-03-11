import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderReqDto } from 'src/dto/orderReq.dto';
import { Order } from 'src/entities/order.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderStatus } from 'src/util/order-status.enum';

const CHECK_AVAILABILITY_AND_BUY = "checkAvailabilityAndBuy"
const FETCH_PRICES = "fetchPrices"

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @Inject('PRODUCT_SERVICE') private readonly orderClient: ClientProxy
    ) {}

    async createOrder(orderDto: OrderReqDto) {
        // Get products from product microservice
        const products = orderDto.products.map(product => 
            ({ productId: product.id, quantity: product.quantity ?? 1 }));

        // Calculate total sum
        let prices: {productId: number, price: number}[];
        try {
            prices = await firstValueFrom(this.orderClient.send(FETCH_PRICES, 
                products.map(product => product.productId)));
        } catch (error) {
            // Handle microservice communication errors
            throw new BadRequestException(`Failed to get bill: ${error.message}`);
        }

        // Check product availability and buy
        try {
            await firstValueFrom(this.orderClient.send(CHECK_AVAILABILITY_AND_BUY, products));
        } catch (error) {
            throw new BadRequestException("Failed to check availability and buy: " + error.message);
        }

        let priceMap = new Map(prices.map(price => [price.productId, price.price]));

        const totalSum = products.reduce((sum, product) => 
            sum + product.quantity * (priceMap.get(product.productId) ?? 0), 0);

        // Create order
        const order = this.orderRepository.create({
            customer: orderDto.customerId,
            products: orderDto.products.map(product => ({
                productId: product.id,
                quantity: product.quantity,
                price: priceMap.get(product.id)
            })),
            totalSum,
            status: OrderStatus.IN_PROGRESS,
        });

        return this.orderRepository.save(order);
    }
}
