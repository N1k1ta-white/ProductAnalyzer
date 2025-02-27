export interface ProductReduxState {
    id: number;
    name: string;
    price: number;
    description: string;
    attributes: ProductAttribute[];
}

export interface ProductAttribute {
    name: string;
    value: string | number;
}

