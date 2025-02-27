export interface AuthUserReduxState extends UserForm {
    id: number;
}

export interface UserForm {
    name: string;
    phone: string;
    email: string;
    address: string;
    zipCode: string;
}
