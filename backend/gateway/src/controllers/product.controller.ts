import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, Req, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Paginate } from 'nestjs-paginate';
import { Public } from 'src/public.decorator';

const ADD_PRODUCT = "addProduct"
const PRODUCT_SERVICE = "PRODUCT_SERVICE"
const GET_PRODUCTS = "getPopularProducts"
const ADD_VIEW = "addProductView"

@Controller('product')
export class ProductController {

    constructor(
        @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
    ) {}

    @Post()
    async addProduct(@Request() req, @Body() payload : any) {
        payload.ownerId =  req.user.id
        return this.productClient.send(ADD_PRODUCT, payload)
    }

    @Get()
    @Public()
    async getProducts(@Paginate() query: any) {        
        return this.productClient.send(GET_PRODUCTS, query)
    }

    @Public()
    @Patch(":id/view")
    @HttpCode(HttpStatus.OK)
    async addView(@Param('id') id: number) {
        this.productClient.emit(ADD_VIEW, {id})
    }
}