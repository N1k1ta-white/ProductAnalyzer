import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductProperty } from 'src/entities/product-property.entity';
import { Product } from 'src/entities/product.entity';
import { Attribute } from 'src/entities/attribute.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DATABASE || 'mysql',
      entities: [Product, ProductProperty, Attribute, Category],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, ProductProperty, Attribute, Category]),
  ],
  exports: [TypeOrmModule.forFeature([Product, ProductProperty, Attribute, Category])],
})
export class DatabaseModule {}
