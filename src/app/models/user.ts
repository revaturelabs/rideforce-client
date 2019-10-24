import { RoleNew } from './role';
import { LocationNew } from './location';

export class UserNew {
    uid: number;
    email: string;
    password: string;
    fname: string;
    lname: string;
    roles: RoleNew[];
    location: LocationNew;
    is_active: boolean;
}