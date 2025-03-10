import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                    queue: 'auth_queue', 
                    queueOptions: { durable: false }
                }
            },
            {
                name: 'PRODUCT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                    queue: 'product_queue', 
                    queueOptions: { durable: false }
                }
            },
            {
                name: 'ORDER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                    queue: 'order_queue', 
                    queueOptions: { durable: false }
                },
            }
        ])
    ],
    exports: [ClientsModule]
})
export class RabbitMqModule {}
