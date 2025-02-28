import { Module } from '@nestjs/common';
import { DatabaseModule } from './util/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [ProductController],
  providers: [DatabaseModule, ProductService],
})
export class AppModule {}
