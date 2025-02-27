import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from 'src/sevices/auth.service';

const REGISTER_USER = "register"
const AUTH_USER = "auth"

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

}
