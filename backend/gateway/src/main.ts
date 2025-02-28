import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? 'http://localhost:3000'],
    credentials: true,
    alllowHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap();
