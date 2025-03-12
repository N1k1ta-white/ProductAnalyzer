import { Exclude } from "class-transformer";
import { ProductProperty } from "./product-property.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn()
    @Exclude({ toPlainOnly: true })
    id: number;

    @Column()
    name: string;

    @Column({default: 1})
    @Exclude({ toPlainOnly: true })
    usage: number;

    @OneToMany(() => ProductProperty, prodAttr => prodAttr.attr)
    prodAttrs: ProductProperty[];
}