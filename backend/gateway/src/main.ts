import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionsFilter } from './util/rpcException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? 'http://localhost:3000'],
    credentials: true,
    alllowHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
  app.useGlobalFilters(new RpcExceptionsFilter())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap();
