import {User} from '../models/user.model'
import { Link } from '../models/link.model';
import { Office } from '../models/office.model';
import { Car } from '../models/car.model';
import { ContactInfo } from '../models/contact-info.model';
import { Role } from '../models/role.model';


export class Login implements User {
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    photoUrl : string;
    address : string;
    office :  Link<Office>;
    batchEnd: any;
    startTime: number;
    bio: string;
    cars: Link<Car>[];
    venmo?: string;
    contactInfo: Link<ContactInfo>[];
    active: string;
    role: Role;
    authToken: string;
    access_token: string;
    api_token: string;
    expires_at: any;
    scopes: any;


}
