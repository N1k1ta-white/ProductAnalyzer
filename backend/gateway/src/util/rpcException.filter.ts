import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class RpcExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // TODO: Clear up status code extraction
    let status = exception?.statusCode || exception?.error?.statusCode
                    || exception?.response?.statusCode
                    || HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
