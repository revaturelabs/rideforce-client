import { Link } from './link.model';
import { Office } from './office.model';
import { Car } from './car.model';
import { ContactInfo } from './contact-info.model';
import { Role } from './role.model';
import { AddressModel } from './address.model';
import { Location } from './location.model';

/**
 * Represents a user of the ride-share system on our front-end
 */
export class User {
  //User id
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
  office: Link<Office>;
  batchEnd: any;
  startTime: number;
  bio: string;
  cars: Link<Car>[];
  contactInfo: Link<ContactInfo>[];
  active: string;
  role: Role;

  // location should be an object with address in it.
  location: Location;

  // Registration token. Will not persist in the DB.
  registrationToken?: string;
  authToken?: string;
  api_token?: string;
  expires_at?: any;
  scopes?: any;
}
