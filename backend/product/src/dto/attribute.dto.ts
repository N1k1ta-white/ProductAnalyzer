import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class AttributeDto {

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    usage: number;
}