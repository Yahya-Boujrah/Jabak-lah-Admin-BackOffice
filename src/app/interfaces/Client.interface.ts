export interface Client {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    birthDate?:Date
    updatedAt?: Date;
    createdAt?: Date;
    phone?: string;
    cin?:string;
    email?: string;
    passwordChanged?: boolean;
    balance?: string;
    accountType?:string
}
