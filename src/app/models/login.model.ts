import { User } from './user.model';
import { Link } from './link.model';
import { Office } from './office.model';
import { Car } from './car.model';
import { Role } from './role.model';
import { ContactInfo } from './contact-info.model';
import { Location } from './location.model';

export class Login implements User {
    location: Location;
    registrationToken: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    photoUrl: string;
    address: Location;
    office:  Link<Office>;
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
