
/** Represents the object the Account Info component would use when creating a new user in the system */
export interface Register {
  /** The User name of the new user */
  username: string;
  /** THe password of the new user */
  password: string;
  /** The long token granted by an administrator (or trainer) to allow new User registration */
  token: string;

}
