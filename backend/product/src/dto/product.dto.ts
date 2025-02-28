import { ProductAttributeDto } from './product-attribute.dto';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ProductDto {

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    categoryId: number;

    @IsNumber()
    @IsOptional()
    ownerId: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Expose()
    @Type(() => ProductAttributeDto)
    @IsArray()
    attributes: ProductAttributeDto[];
}