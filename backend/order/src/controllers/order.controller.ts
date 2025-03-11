import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderReqDto } from 'src/dto/orderReq.dto';
import { OrderService } from 'src/services/order.service';

const CREATE_ORDER = 'createOrder';
const GET_ORDERS_BY_CUSTOMER = 'getOrdersByCustomer';

@Controller()
export class OrderController {

    constructor(private orderService: OrderService) {}

    @MessagePattern(CREATE_ORDER)
    async createOrder(data: OrderReqDto) {
        return this.orderService.createOrder(data);
    }

    // TODO: Implement pagination???
    @MessagePattern(GET_ORDERS_BY_CUSTOMER)
    async getOrdersByCustomer(data: { customerId: number }) {
        return this.orderService.getOrdersByCustomer(data.customerId);
    }
}