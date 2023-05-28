export interface Agent {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    birthDate?:Date;
    address?:string;
    updatedAt?: Date;
    createdAt?: Date;
    immatricule?: string;
    patentNumber?: string;
    phone?: string;
    email?: string;
    cin?: string;
    identityCardRecto?: any;
    identityCardVerso?: any;
    passwordChanged?: boolean;
}
