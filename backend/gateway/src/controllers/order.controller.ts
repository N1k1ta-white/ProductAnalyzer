import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const CREATE_ORDER = 'createOrder';
const GET_ORDERS_BY_CUSTOMER = 'getOrdersByCustomer';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
  ) {}

    @Post()
    createOrder(@Request() req, @Body() payload: any) {
        const id = req.user.id;
        return this.orderClient.send(CREATE_ORDER, {customerId: id, products: payload});
    }

    @Get()
    getOrdersByCustomer(@Request() req) {
        const id = req.user.id;
        return this.orderClient.send(GET_ORDERS_BY_CUSTOMER, {customerId: id});
    }
}
