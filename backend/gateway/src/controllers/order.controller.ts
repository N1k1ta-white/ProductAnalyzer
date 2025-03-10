import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const CREATE_ORDER = 'createOrder';

@Controller('order')
export class OrderController {

    constructor(
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy
    ) {}

    @Post()
    createOrder(@Request() req, @Body() payload: any) {
        const id = req.user.id;
        return this.orderClient.send(CREATE_ORDER, {customerId: id, products: payload.cart});
    }
}
