import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from 'src/services/product.service';

const ADD_PRODUCT = "addProduct"

@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService
    ) {}

    @MessagePattern(ADD_PRODUCT)
    @UsePipes(new ValidationPipe({ transform: true }))
    async addProduct(@Payload() data : { ownerId : number, productDto : ProductDto }) {
        return this.productService.addProduct(data.ownerId, data.productDto)
    }
}
8