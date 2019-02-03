import { Office } from './office.model';

export class RegistrationToken {
  office: Office;
  batchEndDate: string;

  constructor() {
    this.batchEndDate = new Date(Date.now()).toISOString().split('T')[0];
  }
}
