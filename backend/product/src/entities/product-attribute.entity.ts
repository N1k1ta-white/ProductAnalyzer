import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './attribute.entity';
import { Product } from './product.entity';

@Entity()
export class ProductProperty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => Attribute, attribute => attribute.prodAttrs, {eager: true})
    attr: Attribute;

    @ManyToOne(() => Product, product => product.properties, {onDelete: "CASCADE"})
    product: Product;
}