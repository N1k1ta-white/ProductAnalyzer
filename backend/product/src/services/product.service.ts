import { HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/product.dto';
import { Attribute } from 'src/entities/attribute.entity';
import { ProductProperty } from 'src/entities/product-property.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { AttributeService } from './attribute.service';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { paginateConfig } from 'src/util/paginate.config';
import { Category } from 'src/entities/category.entity';
import { rpcException } from 'src/util/exception';
import { PaginatedProductInterceptor } from 'src/util/paginated-product.interceptor';

@Injectable()
export class ProductService {
    constructor(
       @InjectRepository(Product) private productRepository: Repository<Product>,
       @InjectRepository(ProductProperty) private prodAttrRepository: Repository<ProductProperty>,
       @InjectRepository(Category) private categoryRepository: Repository<Category>,
       private attributeService: AttributeService,
    ) {}

    async getProducts(query : PaginateQuery) : Promise<Paginated<Product>> {
        return paginate(query, this.productRepository, paginateConfig)
    }

    async addProduct(productDto: ProductDto): Promise<Product> {
        const category = 
                await this.categoryRepository.findOne({ where: { id: productDto.categoryId } })

        if (!category) {
            throw rpcException("Category not found", HttpStatus.NOT_FOUND)
        }

        let attributesEntities : Attribute[] = 
                await this.attributeService.getAttrEntities(productDto.properties)

        let product : Product = this.productRepository.create(productDto);

        const productProperties : ProductProperty[] = product.properties.map((attr, index) => {
            return this.prodAttrRepository.create({
                value: attr.value,
                attr: attributesEntities[index]
            })
        });

        product.category = category
        product.properties = productProperties

        return this.productRepository.save(product)
    }

    addView(id: number) {
        this.productRepository.increment({id}, "views", 1)
    }

    getViewsByCategory(categoryId: number, userId: number) {
        return this.productRepository.createQueryBuilder()
            .select("SUM(views)", "views")
            .where("categoryId = :categoryId", {categoryId})
            .andWhere("ownerId = :userId", {userId})
            .getRawOne()
    }

    getCategories() {
        return this.productRepository.createQueryBuilder()
            .select("DISTINCT categoryId")
            .getRawMany()
    }
}