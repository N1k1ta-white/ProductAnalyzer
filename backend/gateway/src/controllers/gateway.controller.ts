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

    @Public()
    @Post("register")
    async register(@Body() payload: any) {
        return firstValueFrom(this.authClient.send(REGISTER_USER, payload))
    }

    @Public()
    @Post("login")
    async login(@Body() payload: any) {
        return this.authClient.send(AUTH_USER, payload)
    }

    @Get("profile")
    async profile(@Headers('authorization') jwtToken: string) {
        return this.authClient.send(PROFILE_USER, jwtToken.replace('bearer ', ''))
    }
}
