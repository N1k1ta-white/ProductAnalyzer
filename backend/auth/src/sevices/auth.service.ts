import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService : UserService,
        private jwtService : JwtService,
    ) {}

    async registerUser(userDto : UserDto) {
        const user = await this.userService.registerUser(userDto)
        const token = this.jwtService.sign({login: user.login, sub : user.id})
        return {user, token}
    }

    async authUser(userDto : UserDto) {
        const user = await this.userService.authUser(userDto)
        const token = this.jwtService.sign({login: user.login, sub : user.id})
        return {user, token}
    }
}
