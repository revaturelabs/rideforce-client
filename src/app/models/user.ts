import { Role } from './role';
import { Location } from './location';

export class User {
    uid: number;
    email: string;
    password: string;
    fname: string;
    lname: string;
    roles: Role[];
    location: Location;
    isActive: boolean;
    distance: string;
}