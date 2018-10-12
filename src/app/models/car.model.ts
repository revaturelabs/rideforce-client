import { User } from './user.model';
import { Link } from './link.model';

/** Represents the Car a User (cheifly a Driver) owns */
export class Car {
  /**
   * The ID of the car in the database.
   */
  id: number;
  /**
   * The owner of this car. Represents the URL mapping to the actual user
   */
  owner: Link<User>;
  /** The Producer of the Vehicle */
  make: string;
  /** THe model of the vehicle */
  model: string;
  /** THe year the car was produced */
  year: number;
}
