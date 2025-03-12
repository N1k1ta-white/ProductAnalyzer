import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductProperty } from './product-property.entity';
import { Category } from './category.entity';
import { Min } from 'class-validator';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({default: 1})
    @Min(0)
    quantity: number;

    @ManyToOne(() => Category, category => category.products, {nullable: false})
    category: Category;

    @Column()
    ownerId: number;

    @Column({nullable: true})
    description: string;

    @Column({default: 0})
    views: number;

    @OneToMany(() => ProductProperty, productAttribute => productAttribute.product, {cascade: true})
    properties: ProductProperty[];
}