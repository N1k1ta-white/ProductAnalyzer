import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

const ADD_PRODUCT = "addProduct"
const SERVICE = "PRODUCT_SERVICE"

@Controller('product')
export class ProductController {

    constructor(
        @Inject(SERVICE) private readonly authClient: ClientProxy,
    ) {}

    @Post()
    async addProduct(@Request() req, @Body() payload : any) {
        payload.ownerId =  req.user.id
        return this.authClient.send(ADD_PRODUCT, payload)
    }
}