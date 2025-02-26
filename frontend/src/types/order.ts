import {User, UserForm} from "@/types/user.ts";
export interface OrderProducts {
    productId: number;
    amount: number
}

export interface Order {
    id: number,
    products: OrderProducts[],
    date: Date,
    user: UserForm | User,
}