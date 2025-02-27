import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL ?? 'amqp://localhost:5672'],
                    queue: "auth_queue",
                    queueOptions: { durable: false }
                }
            },
        ])
    ],
    exports: [ClientsModule]
})
export class RabbitMqModule {}
