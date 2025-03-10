import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from 'src/util/order-status.enum';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    uuid: number;

    @Column()
    customer: number;

    @Column()
    @Min(0)
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @OneToMany(() => OrderItem, orderProduct => orderProduct.order)
    products: OrderItem[];

    @Column()
    totalSum: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.IN_PROGRESS,
    })
    status: OrderStatus;
}
