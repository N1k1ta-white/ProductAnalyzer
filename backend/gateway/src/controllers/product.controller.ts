import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Paginate } from 'nestjs-paginate';
import { Public } from 'src/public.decorator';

const ADD_PRODUCT = "addProduct"
const PRODUCT_SERVICE = "PRODUCT_SERVICE"
const GET_PRODUCTS = "getPopularProducts"
const ADD_VIEW = "addProductView"
const GET_CATEGORIES = "getCategories"
const GET_VIEWS_BY_CATEGORY = "getViewsByCategory"

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

    @Public()
    @Get("category")
    async getCategories() {
        return this.productClient.send(GET_CATEGORIES, {})
    }

    @Get("views/:categoryId")
    async getViewsByCategory(@Param('categoryId') categoryId: number, @Request() req) {
        return this.productClient.send(GET_VIEWS_BY_CATEGORY, {categoryId, userId: req.user.id})
    }
}