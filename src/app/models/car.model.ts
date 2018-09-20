import { User } from "./user.model";
import { Link } from "./link.model";

export interface Car {
    /**
   * The ID of the car in the database.
   */
  id: number;
  /**
   * The owner of this car.
   */
  owner: Link<User>;
  make: string;
  model: string;
  year: number;
}