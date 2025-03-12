import { Body, Controller, Get, Inject, Post, Headers, UseFilters } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseRpcExceptionFilter, ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/util/public.decorator';
import { getToken } from 'src/util/getToken';

const REGISTER_USER = "register"
const AUTH_USER = "auth"
const PROFILE_USER = "profile"
const AUTH_SERVICE = "AUTH_SERVICE"

@Controller()
export class AuthController {

    constructor(
        @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    ) {}

    @Public()
    @Post("register")
    async register(@Body() payload: any) {
        return this.authClient.send(REGISTER_USER, payload)
    }

    @Public()
    @Post("login")
    async login(@Body() payload: any) {
        return this.authClient.send(AUTH_USER, payload)
    }

    @Get("profile")
    async profile(@Headers('authorization') jwtToken: string) {
        return this.authClient.send(PROFILE_USER, getToken(jwtToken))
    }
}
