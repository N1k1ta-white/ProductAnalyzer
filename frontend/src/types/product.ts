export interface Attribute {
    name: string
    value: string | number
}

export interface Product {
    id: number,
    name: string,
    price: number,
    category: string,
    attributes: Attribute[]
}

