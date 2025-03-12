import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log(exception)
    let status = exception.statusCode || exception.error.statusCode 
                    || HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
