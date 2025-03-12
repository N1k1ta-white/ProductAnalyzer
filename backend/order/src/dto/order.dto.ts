import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "src/util/order-status.enum";

export class OrderDto {

    @IsString()
    @IsNotEmpty()
    uuid: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    customer: number;

    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    totalSum: number;

    @IsNotEmpty()
    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsNotEmpty()
    @IsOptional()
    productsId: number[];
}