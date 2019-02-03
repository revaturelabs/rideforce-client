import { Usr } from './usr.model';

export class UserRegistration {
  user: Usr;
  registrationToken: string;

  constructor() {
    this.user = new Usr();
  }
}
