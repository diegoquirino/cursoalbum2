import {Role} from "./role";
import * as fire from "firebase";
import Timestamp = fire.firestore.Timestamp;

export interface User {
    uid: string;
    email: string;
    name?: string;
    passport?: string;
    passport_expiration_date?: Timestamp;
    personal_id?: string;
    phone_number?: string;
    role?: Role;
}
