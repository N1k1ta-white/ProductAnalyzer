export interface ProductReduxState {
    id?: number;
    name: string;
    quantity: number;
    ownerId: number;
    categoryId?: string | number;
    price: number;
    description: string;
    properties: ProductAttribute[];
}

export interface ProductAttribute {
    name: string;
    value: string | number;
}

