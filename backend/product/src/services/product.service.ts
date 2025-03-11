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

    async checkAvailabilityAndBuy(product: { productId: number; quantity: number }[]) {
        return await this.productRepository.manager.transaction(async transactionalEntityManager => {
            // Step 1: Find products with insufficient stock and lock them
            const insufficientProducts = await transactionalEntityManager
                .createQueryBuilder(Product, 'product')
                .setLock('pessimistic_write')
                .select(['product.id', 'product.quantity'])
                .where('product.id IN (:...productIds)', { productIds: product.map(p => p.productId) })
                .andWhere(
                    `product.quantity < CASE 
                        ${product.map(p => `WHEN id = ${p.productId} THEN ${p.quantity}`).join(' ')}
                        ELSE 0 END`
                )
                .getMany();
                
            // If there are insufficient products, throw an error
            if (insufficientProducts.length > 0) {
                throw rpcException(
                    `Not enough stock for products: ${insufficientProducts.map(p => `ID ${p.id} (Only ${p.quantity} left)`).join(', ')}`,
                    HttpStatus.BAD_REQUEST
                );
            }
    
            // Step 2: Perform the batch update
            await transactionalEntityManager
                .createQueryBuilder()
                .update(Product)
                .set({
                    quantity: () => `CASE 
                        ${product.map(p => `WHEN id = ${p.productId} THEN quantity - ${p.quantity}`).join(' ')} 
                        ELSE quantity END`
                })
                .where('id IN (:...productIds)', { productIds: product.map(p => p.productId) })
                .execute();
        });
    }

    fetchProductPrices(productIds: number[]) {
        return this.productRepository.createQueryBuilder('product')
            .select('product.id', 'productId')
            .addSelect('product.price', 'price')
            .whereInIds(productIds)
            .getRawMany();
    }
    
    // TODO: What we will do if we will wait for payment of customer???
}