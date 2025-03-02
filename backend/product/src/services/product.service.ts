import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeDto } from 'src/dto/attribute.dto';
import { ProductPropertyDto } from 'src/dto/product-attribute.dto';
import { ProductDto } from 'src/dto/product.dto';
import { Attribute } from 'src/entities/attribute.entity';
import { ProductProperty } from 'src/entities/product-attribute.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
       @InjectRepository(Product) private productRepository: Repository<Product>,
       @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
       @InjectRepository(ProductProperty) private prodAttrRepository: Repository<ProductProperty>,
    ) {}

    async findOrCreateAttributeByName(name: string): Promise<Attribute> {
        let attribute: Attribute | null = await this.attributeRepository.findOneBy({ name });
        
        if (!attribute) {
            attribute = this.attributeRepository.create({ name });
            return this.attributeRepository.save(attribute);
        }
        
        return attribute;
    }
    

    // async getProducts(): Promise<Product[]> {
    //     return await this.productRepository.getProducts(;
    // }

    async getAttrEntities(attrs : ProductPropertyDto[]) : Promise<Attribute[]> {
        let attributesName : string[] = Object.values(
            attrs.map(attribute => attribute.name));

        return Promise.all(attributesName.map(name => this.findOrCreateAttributeByName(name)))
    }

    async addProduct(productDto: ProductDto): Promise<Product> {
        let attributesEntities : Attribute[] = await this.getAttrEntities(productDto.properties)

        let product : Product = this.productRepository.create(productDto);

        const productPropersties : ProductProperty[] = product.properties.map((attr, index) => {
            return this.prodAttrRepository.create({
                value: attr.value,
                attr: attributesEntities[index]
            })
        });

        product.properties = productPropersties

        return this.productRepository.save(product)
    }
}