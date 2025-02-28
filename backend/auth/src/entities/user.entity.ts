import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    zipCode: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;
}