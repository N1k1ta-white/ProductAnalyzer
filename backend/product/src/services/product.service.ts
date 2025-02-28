import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
       @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async addProduct(ownerId : number, productDto: ProductDto): Promise<Product> {
        const product = this.productRepository.create(productDto);
        product.ownerId = ownerId;

        console.log(product);

        return await {id: 1, name: 'test', price: 100, quantity: 10, categoryId: 1, ownerId: 1, description: 'test', attributes: []};

        // return await this.productRepository.save(product);
    }
}
