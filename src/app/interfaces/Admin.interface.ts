export interface Admin{
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    cin ?: string;
    updatedAt?: Date;
    createdAt?: Date;
    role ?:string;
    phone?: string;
    email?: string;
    passwordChanged?: boolean;
}