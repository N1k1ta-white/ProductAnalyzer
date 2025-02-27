import { Module } from '@nestjs/common';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { GatewayController } from './controllers/gateway.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [RabbitMqModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [GatewayController],
  providers: [JwtStrategy, 
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
  ],
})
export class AppModule {}
