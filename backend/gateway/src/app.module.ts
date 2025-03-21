import { Module } from '@nestjs/common';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt/jwt.guard';
import { ProductController } from './controllers/product.controller';
import { AttributeController } from './controllers/attribute.controller';
import { OrderController } from './controllers/order.controller';
import { ChatGateway } from './gateway/chat.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RabbitMqModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, ProductController, AttributeController, OrderController],
  providers: [JwtStrategy, ChatGateway, JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
  ],
})
export class AppModule {}
