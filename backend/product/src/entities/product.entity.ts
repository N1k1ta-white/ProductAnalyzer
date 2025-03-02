import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductProperty } from './product-property.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({default: 1})
    quantity: number;

    @Column({nullable: true})
    categoryId: number;

    @Column()
    ownerId: number;

    @Column({nullable: true})
    description: string;

    @Column({default: 0})
    views: number;

    @OneToMany(() => ProductProperty, productAttribute => productAttribute.product, {cascade: true})
    properties: ProductProperty[];
}