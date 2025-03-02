import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductPropertyDto {

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}