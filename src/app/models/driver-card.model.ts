import { User } from "./user.model";

/** Represents the User selection item in the html page */
export interface DriverCard {
  /** The User being represented */
  user: User;
  /** The status of the given user */
  choose: string;
  /** Toggle for the card */
  face: String;
  /** Card image */
  image: any;
  /**The calculated distance for sorting with geolocation */
  distance: number;
}
