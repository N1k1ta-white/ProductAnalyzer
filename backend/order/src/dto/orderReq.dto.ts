import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class OrderReqDto {
    @IsNumber()
    customerId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProdReqDto)
    products: OrderProdReqDto[];
}

export class OrderProdReqDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    amount: number;
}