import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeDto } from 'src/dto/attribute.dto';
import { ProductPropertyDto } from 'src/dto/product-property.dto';
import { ProductDto } from 'src/dto/product.dto';
import { Attribute } from 'src/entities/attribute.entity';
import { ProductProperty } from 'src/entities/product-property.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { AttributeService } from './attribute.service';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { paginateConfig } from 'src/util/paginate.config';

// TODO: PAGINATION!!!
const TEMP_LIMIT = 100

@Injectable()
export class ProductService {
    constructor(
       @InjectRepository(Product) private productRepository: Repository<Product>,
       @InjectRepository(ProductProperty) private prodAttrRepository: Repository<ProductProperty>,
       private attributeService: AttributeService,
    ) {}

    async getProducts(query : PaginateQuery) : Promise<Paginated<Product>> {
        return paginate(query, this.productRepository, paginateConfig)

        // return this.productRepository.createQueryBuilder("product")
        //     .orderBy("product.views", "DESC")
        //     .limit(TEMP_LIMIT)
        //     .getMany()
    }

    async addProduct(productDto: ProductDto): Promise<Product> {
        let attributesEntities : Attribute[] = 
                await this.attributeService.getAttrEntities(productDto.properties)

        let product : Product = this.productRepository.create(productDto);

        const productProperties : ProductProperty[] = product.properties.map((attr, index) => {
            return this.prodAttrRepository.create({
                value: attr.value,
                attr: attributesEntities[index]
            })
        });

        product.properties = productProperties

        return this.productRepository.save(product)
    }

    addView(id: number) {
        this.productRepository.increment({id}, "views", 1)
    }
}