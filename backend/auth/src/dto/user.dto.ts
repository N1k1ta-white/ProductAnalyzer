import { IsDate, IsDateString, IsEmail, IsHash, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, isPhoneNumber, IsString, Matches, Max, Min } from "class-validator";

export class UserDto {
    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    login: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @IsOptional()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @IsHash("sha256")
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Matches("^\d{5}(?:[-\s]\d{4})?$")
    @IsOptional()
    zipCode: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(9999999999)
    createDateTime: Date;
}