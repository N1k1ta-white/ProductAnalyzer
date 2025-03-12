import { CategoryReduxState } from "./category";

export interface ProductReduxState {
    id?: number;
    name: string;
    quantity: number;
    ownerId: number;
    category: CategoryReduxState;
    price: number;
    description: string;
    properties: ProductAttribute[];
}

export interface ProductAttribute {
    name: string;
    value: string | number;
}

