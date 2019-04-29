import { Office } from './office.model';

export class RegistrationToken {
  office: Office;
  batchEndDate: string;
	today: Date;

  constructor() {
	  this.today = new Date();
	  console.log(this.today);
	  var day = this.today.getDay() || 7;
	  if (day !== 5) {
		  let friday = this.today.setHours(-24 * (day - 5))
		  //Friday currently
		  var tenweeks = new Date(new Date(friday).getTime() + (70 * 24 * 60 * 60 * 1000));
		  this.batchEndDate = new Date(tenweeks).toISOString().split('T')[0];
	  }
	  else {
		  var tenweeks = new Date(new Date().getTime() + (70 * 24 * 60 * 60 * 1000));
		  this.batchEndDate = new Date(tenweeks).toISOString().split('T')[0];
	  }
  }
}
