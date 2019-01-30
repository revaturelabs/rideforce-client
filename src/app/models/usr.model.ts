import { Role } from './role.model';

export class Usr {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
  bio: string;
  active: string;
  role: Role;
  office: string;
  address: string;
  startTime: number;
  batchEnd: string;
  cars: any[];
  contactInfo: any[];

  constructor() {
    this.id = 1;
    this.active = 'ACTIVE';
  }
}
