import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export function rpcException(message: string, statusCode: HttpStatus) {
    return new RpcException({message, statusCode});
}