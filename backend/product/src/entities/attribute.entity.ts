import { ProductAttribute } from "./product-attribute.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    usage: number;

    @OneToMany(() => ProductAttribute, prodAttr => prodAttr.attr)
    prodAttrs: ProductAttribute[];
}