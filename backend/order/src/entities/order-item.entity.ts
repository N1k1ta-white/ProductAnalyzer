import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Min } from 'class-validator';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    @Min(1)
    amount: number;

    @ManyToOne(() => Order, order => order.products)
    order: OrderItem;
}
