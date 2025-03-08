import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { ProductDto } from 'src/dto/product.dto';
import { AttributeService } from 'src/services/attribute.service';
import { ProductService } from 'src/services/product.service';
import { PaginatedProductInterceptor } from 'src/util/paginated-product.interceptor';

const ADD_PRODUCT = "addProduct"
const GET_POPULAR_ATTRIBUTES = "getPopularAttributes"
const GET_PRODUCTS = "getPopularProducts"
const ADD_VIEW = "addProductView"
const GET_VIEWS_BY_CATEGORY = "getViewsByCategory"
const GET_CATEGORIES = "getCategories"

@Controller()
export class ProductController {

    constructor(
        private productService: ProductService,
        private attributeService: AttributeService
    ) {}

    @MessagePattern(ADD_PRODUCT)
    async addProduct(@Payload() productDto : ProductDto) {
        return this.productService.addProduct(productDto)
    }

    @MessagePattern(GET_POPULAR_ATTRIBUTES)
    async getPopularAttributes() {
        return this.attributeService.getPopularAttributes();
    }

    @MessagePattern(GET_PRODUCTS)
    @UseInterceptors(PaginatedProductInterceptor)
    async getProducts(@Payload() query : PaginateQuery) {
        return this.productService.getProducts(query)
    }

    @MessagePattern(ADD_VIEW)
    async addViewToProduct(@Payload() params : { id : number }) {
        this.productService.addView(params.id)
    }

    @MessagePattern(GET_VIEWS_BY_CATEGORY)
    async getViewsByCategory(@Payload() params : { categoryId : number, userId : number }) {
        return this.productService.getViewsByCategory(params.categoryId, params.userId)
    }

    @MessagePattern(GET_CATEGORIES)
    async getCategories() {
        return this.productService.getCategories()
    }
}
