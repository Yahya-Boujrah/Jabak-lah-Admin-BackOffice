import { Admin } from "./Admin.interface";
import { Agent } from "./Agent.interface";
import { Client } from "./Client.interface";

export interface CustomResponse {
    statusCode: number;
    status: string;
    message: string;
    data: {agents?: Agent[], agent?:Agent,  clients?: Client[] , client?: Client
            admins?: Admin[] , admin?: Admin};  
}