import { ProductProperty } from "./product-attribute.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 1})
    usage: number;

    @OneToMany(() => ProductProperty, prodAttr => prodAttr.attr)
    prodAttrs: ProductProperty[];
}