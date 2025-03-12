import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException, Transport } from '@nestjs/microservices';
import { GlobalExceptionFilter } from './util/global-exception.filter';

async function bootstrap() {
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE,
        queueOptions: { durable: false },
      }
    })

    microservice.useGlobalPipes(new ValidationPipe({ exceptionFactory: (errors) => 
      new RpcException({ message: errors.map(error => 
        Object.values(error.constraints || {})).flat().join(", "), 
        statusCode: HttpStatus.BAD_REQUEST})}))

    microservice.useGlobalFilters(new GlobalExceptionFilter())

    await microservice.listen()
}
bootstrap();
