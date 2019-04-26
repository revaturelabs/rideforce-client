import { Office } from './office.model';

export class RegistrationToken {
  office: Office;
  batchEndDate: string;

  constructor() {
	  var today = new Date();
	  var day = today.getDay() || 3;
	  if (day !== 1) {
		  today.setHours(-24 * (day - 5));
		  /*var friday = today.setHours(-24 * (day - 5))*/
		  /*today.setDate(today.setHours(-24 * (day - 5)) + 70);*/
		  //Friday currently
		  var tenweeks = new Date(new Date(today).getTime() + (70 * 24 * 60 * 60 * 1000));
		  this.batchEndDate = new Date(tenweeks).toISOString().split('T')[0];
	  }
	  else {
		  var tenweeks = new Date(new Date().getTime() + (70 * 24 * 60 * 60 * 1000));
		  this.batchEndDate = new Date(tenweeks).toISOString().split('T')[0];
	  }
  }
}
