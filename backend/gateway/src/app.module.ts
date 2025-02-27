import { Module } from '@nestjs/common';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { GatewayController } from './controllers/gateway.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RabbitMqModule,
    ConfigModule.forRoot(),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class AppModule {}
