export interface OrderReduxState {
    id: number;
    customer: string;
    date: string;
    totalSum: number;
    status: 'SHIPPED' | 'SENT' | 'IN PROGRESS' | "CANCEL";
    products: string[];
}