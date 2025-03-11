import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const excResponse = exception.response
    
    return throwError(() => 
       new RpcException({ message: excResponse.message ?? "Internal server error",
           statusCode: excResponse.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR }));
  }
}