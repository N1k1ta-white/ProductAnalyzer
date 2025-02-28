import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
    ) {}

    async registerUser(userDto : UserDto) : Promise<User> {
        const exisingUser = await this.userRepository.findOne({where : {email: userDto.email}})
        if (exisingUser) {
            throw new RpcException({
                message: "User already exists",
            })
        }

        const encrypedPassword = await bcrypt.hash(userDto.password, 10)
        const user = this.userRepository.create({...userDto, password : encrypedPassword})
        return await this.userRepository.save(user)
    }

    async authUser(userDto : UserDto) : Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: userDto.email} })
        if (!user) {
            throw new RpcException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
        if (!isPasswordValid) {
            throw new RpcException('Invalid password');
        }

        return user;
    }

    async getById(id : number) : Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new RpcException('User not found or token is invalid')
        }

        return user;
    }
}
