import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './attribute.entity';
import { Product } from './product.entity';

@Entity()
export class ProductAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @ManyToOne(() => Attribute, attribute => attribute.prodAttrs)
    attr: Attribute;

    @ManyToOne(() => Product, product => product.attributes)
    product: Product;
}