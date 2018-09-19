import { AddressModel } from './address.model';

export class UserModel {
    userID: number;
    firstname: string;
    lastname: string;
    email: string;
    address?: AddressModel;
    batchend?: Date;
    Venmo?: string;
    active?: boolean;
    roleID: number;
    officeID: number;
    photourl?: string;
}
