import { Controller, HttpStatus, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BaseRpcExceptionFilter, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { kMaxLength } from 'buffer';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from 'src/sevices/auth.service';
import { TransformInterceptor } from 'src/util/transform.interceptor';

const REGISTER_USER = "register"
const AUTH_USER = "auth"
const PROFILE_USER = "profile"

@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService
    ) {}

    @MessagePattern(REGISTER_USER)
    async registerUser(@Payload() userDto : UserDto) {
       return this.authService.registerUser(userDto)
    }

    @MessagePattern(AUTH_USER)
    async authUser(@Payload() userDto : UserDto) {
        return this.authService.authUser(userDto)
    }

    @MessagePattern(PROFILE_USER)
    async profileUser(@Payload() jwtToken : string) {
        return this.authService.profileUser(jwtToken)
    }

}
