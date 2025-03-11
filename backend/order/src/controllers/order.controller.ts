import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderReqDto } from 'src/dto/orderReq.dto';
import { OrderService } from 'src/services/order.service';

const CREATE_ORDER = 'createOrder';

@Controller()
export class OrderController {

    constructor(private orderService: OrderService) {}

    @MessagePattern(CREATE_ORDER)
    async createOrder(data: OrderReqDto) {
        return this.orderService.createOrder(data);
    }
}