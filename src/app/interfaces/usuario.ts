import { RolesI } from "./roles";

export interface UserI {
    id?: string;
    Nombre?: string;
    Apellido?: string;
    email?: string;
    passwod?: string;
    roles?: RolesI;
}
