import { Role } from './role';
import { Location } from './location';

export class User {
    id: number;
    email: string;
    password: string;
    fname: string;
    lname: string;
    roles: Role[];
    location: Location;
    is_active: boolean;
}