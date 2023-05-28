import { Admin } from "./Admin.interface";

export interface AuthResponse {
   token : string;
   user : Admin;
}