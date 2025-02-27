import { BadRequestException, Body, Controller, HttpStatus, Inject, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

const REGISTER_USER = "register"
const AUTH_USER = "auth"

@Controller()
export class GatewayController {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    ) {}

    @Post("register")
    async register(@Body() user: any) {
        try {
            const res = await firstValueFrom(this.authClient.send(REGISTER_USER, user))
            return res
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Post("login")
    async login(@Body() user: any) {
        try {
            return this.authClient.send(AUTH_USER, user)
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }
}
