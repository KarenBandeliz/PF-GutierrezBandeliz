import { RolesI } from "./roles";
export interface Menu {
    name: string;
    redirect: string;
    icon: string;
    auth:RolesI
}