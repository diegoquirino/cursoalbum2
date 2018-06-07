import {Role} from "./role";

export interface User {
    uid: string;
    email: string;
    name?: string;
    passport?: string;
    passport_expiration_date?: string;
    personal_id?: string;
    phone_number?: string;
    role?: Role;
}
