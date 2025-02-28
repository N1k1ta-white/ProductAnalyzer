import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from 'class-validator';
import { AttributeDto } from './attribute.dto';

export class ProductAttributeDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmptyObject()
    attr: AttributeDto;

    @IsString()
    @IsNotEmpty()
    value: string;
}