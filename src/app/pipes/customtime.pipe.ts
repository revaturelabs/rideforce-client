import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customtime'
})
export class CustomtimePipe implements PipeTransform {
  d : Date = new Date();
  transform(value: number): Date {
    if(value % 1 != 0){
      //this.d = new Date('0' + (value-0.5).toString + ':30:00');
      this.d.setHours(value-0.5);
      this.d.setMinutes(30);
    } else {
     // this.d = new Date('0' + value.toString + ':00:00');
     this.d.setHours(value);
     this.d.setMinutes(0);
    }
    return this.d;
  }

}
