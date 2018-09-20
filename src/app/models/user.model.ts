import { Link } from './link.model';
import { Office } from './office.model';
import { Car } from './car.model';
import { ContactInfo } from './contact-info.model';

export interface User {
    /**
   * The ID of the user in the database.
   */
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  /**
   * The user's home address (where they currently live).
   */
  address: string;
  /**
   * The user's office (where they work).
   */
  office: Link<Office>;
  /**
   * The end date of the batch, in the format (yyyy-MM-dd'T'HH:mm:ss.SSS'Z').
   */
  batchEnd: string;
  cars: Link<Car>[];
  /**
   * The user's Venmo username.
   */
  venmo?: string;
  /**
   * The user's contact information.
   */
  contactInfo: Link<ContactInfo>[];
  /**
   * Whether the user's account is active.
   */
  active: boolean;
  /**
   * The user's role, determining what permissions they have to access data on
   * the server.
   */
  // Remove the question mark later
  role?: Role;

  photoUrl: string;
}