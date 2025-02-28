import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RpcException } from '@nestjs/microservices';
import { rpcException } from 'src/exception';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
    ) {}

    async registerUser(userDto : UserDto) : Promise<User> {
        const exisingUser = await this.userRepository.findOne({where : {email: userDto.email}})
        if (exisingUser) {
            throw rpcException('User already exists', HttpStatus.BAD_REQUEST)
        }

        const encrypedPassword = await bcrypt.hash(userDto.password, 10)
        const user = this.userRepository.create({...userDto, password : encrypedPassword})
        return await this.userRepository.save(user)
    }

    async authUser(userDto : UserDto) : Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: userDto.email} })
        if (!user) {
            throw rpcException('User not found', HttpStatus.NOT_FOUND)
        }

        const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
        if (!isPasswordValid) {
            throw rpcException('Invalid password', HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async getById(id : number) : Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if (!user) {
            throw rpcException('User not found or token is invalid', HttpStatus.NOT_FOUND)
        }

        return user;
    }
}
