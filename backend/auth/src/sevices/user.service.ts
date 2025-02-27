import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository : Repository<User>,
    ) {}

    async registerUser(userDto : UserDto) : Promise<User> {
        const exisingUser = await this.userRepository.findOne({where : {login: userDto.login}})
        if (exisingUser) {
            throw new BadRequestException("User already exists")
        }

        const encrypedPassword = await bcrypt.hash(userDto.password, 10)
        const user = this.userRepository.create({...userDto, password : encrypedPassword})
        return await this.userRepository.save(user)
    }

    async authUser(userDto : UserDto) : Promise<User> {
        const user = await this.userRepository.findOne({ where: { login: userDto.login} })
        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return user;
    }
}
