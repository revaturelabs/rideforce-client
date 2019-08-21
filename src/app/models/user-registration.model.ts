import {User} from './user.model';

export class UserRegistration {
  user: User;
  registrationToken: string;

  constructor() {
    this.user = new User();
  }
}
