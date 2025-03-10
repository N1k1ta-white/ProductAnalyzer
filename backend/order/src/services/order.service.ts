import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderReqDto } from 'src/dto/orderReq.dto';
import { Order } from 'src/entities/order.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @Inject('PRODUCT_SERVICE') private readonly orderClient: ClientProxy
    ) {}

    createOrder(orderDto: OrderReqDto) {
        // TODO: Get products from product microservice, calculate total sum
        // TODO: Check if products are available and create order

        let products = orderDto.products.map(product => ({ id: product.id, amount: product.amount ?? 1 }))
        
    }
}
