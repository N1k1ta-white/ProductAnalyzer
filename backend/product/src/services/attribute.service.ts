import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPropertyDto } from 'src/dto/product-property.dto';
import { Attribute } from 'src/entities/attribute.entity';
import { Repository } from 'typeorm';

const START_VALUE = 0
const LIMIT_POPULAR = 100

@Injectable()
export class AttributeService {

    constructor(
       @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
    ) {}

    async getAttrEntities(attrs : ProductPropertyDto[]) : Promise<Attribute[]> {
        let attributesName : string[] = Object.values(
            attrs.map(attribute => attribute.name));

        return Promise.all(attributesName.map(name => 
            this.findOrCreateAttributeByName(name)))
    }

    async findOrCreateAttributeByName(name: string): Promise<Attribute> {
        let attribute: Attribute | null = await this.attributeRepository.findOneBy({ name });
        
        if (!attribute) {
            attribute = this.attributeRepository.create({ name });
            attribute.usage = START_VALUE
        }

        attribute.usage++;

        return this.attributeRepository.save(attribute)
    }

    async getPopularAttributes() {
        return this.attributeRepository
            .createQueryBuilder("attribute")
            .addOrderBy("attribute.usage", "DESC")
            .limit(LIMIT_POPULAR)
            .getMany()
    }
}