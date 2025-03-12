import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './util/database.module';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, RabbitMqModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
