import { Usr } from './usr.model';

export class UserRegistrationInfo {
  user: Usr;
  idToken: string;
  registrationToken: string;

  constructor() {
    this.user = new Usr();
  }
}
