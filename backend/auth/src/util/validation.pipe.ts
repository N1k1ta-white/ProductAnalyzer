import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      // Override the exceptionFactory to throw RpcException
      exceptionFactory: (errors) => new RpcException(errors),
    });
  }
}
