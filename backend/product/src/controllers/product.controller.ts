import { ConsoleLogger, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
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
    async addProduct(@Payload() productDto : ProductDto) {
        return this.productService.addProduct(productDto)
    }
}
8