import {Payment} from "@/types/payment.ts";

export interface UserForm {
    name: string;
    phone: string;
    email: string;
    address: string;
    zipCode: string;
    payment: Payment
}

export interface User extends UserForm {
    id: number;
}