import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, Post, UnauthorizedException, UseFilters, Headers } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/public.decorator';

const REGISTER_USER = "register"
const AUTH_USER = "auth"
const PROFILE_USER = "profile"

@Controller()
export class GatewayController {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    ) {}

    // TODO: Implement handling exceptions 

    @Public()
    @Post("register")
    async register(@Body() payload: any) {
        try {
            const res = await firstValueFrom(this.authClient.send(REGISTER_USER, payload))
            return res
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Public()
    @Post("login")
    async login(@Body() payload: any) {
        try {
            return this.authClient.send(AUTH_USER, payload)
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }

    @Get("profile")
    async profile(@Headers('authorization') jwtToken: string) {
        try {
            return this.authClient.send(PROFILE_USER, jwtToken.replace('bearer ', ''))
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }
}
