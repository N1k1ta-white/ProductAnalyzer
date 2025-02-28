import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './sevices/auth.service';
import { UserService } from './sevices/user.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './util/database.module';
import { RpcValidationPipe } from './util/validation.pipe';

@Module({
  imports:[ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers:[AuthService, UserService],
  controllers: [AuthController]
})
export class AppModule {}