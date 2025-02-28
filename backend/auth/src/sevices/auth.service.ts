import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { classToPlain, Exclude, instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {

    constructor(
        private userService : UserService,
        private jwtService : JwtService,
    ) {}

    async registerUser(userDto : UserDto) {
        const user = await this.userService.registerUser(userDto)
        const token = this.jwtService.sign({email: user.email, id : user.id})
        return {user, token}
    }

    async authUser(userDto : UserDto) {
        const user = await this.userService.authUser(userDto)
        const token = this.jwtService.sign({email: user.email, id : user.id})
        return {user, token}
    }

    async profileUser(jwt : string) {
        const id = this.jwtService.verify(jwt).id
        return this.userService.getById(id)
    }
}
