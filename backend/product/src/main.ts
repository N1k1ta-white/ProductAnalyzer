import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { RpcException, Transport } from '@nestjs/microservices';
import { TransformInterceptor } from './util/transform.interceptor';

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

    microservice.useGlobalInterceptors(new TransformInterceptor())
        
    await microservice.listen()
}
bootstrap();
