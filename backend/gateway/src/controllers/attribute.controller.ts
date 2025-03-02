import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/public.decorator';

const PRODUCT_SERVICE = "PRODUCT_SERVICE"
const GET_POPULAR_ATTRIBUTES = "getPopularAttributes"


@Controller('attribute')
export class AttributeController {
    constructor(
        @Inject(PRODUCT_SERVICE) private readonly authClient: ClientProxy,
    ) {}
    
    @Get()
    @Public()
    async getMostPopularAttributes() {
        return this.authClient.send(GET_POPULAR_ATTRIBUTES, {})
    }
}
