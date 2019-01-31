import { Role } from './role.model';
import { Office } from './office.model';
import { ContactInfo } from './contact-info.model';

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
  office: Office;
  address: string;
  startTime: number;
  batchEnd: string;
  cars: any[];
  contactInfo: ContactInfo[];

  constructor() {
    this.id = 1;
    this.active = 'ACTIVE';
    this.role = Role.Rider;
    this.startTime = 7.5;
    this.contactInfo = [];
  }
}
