import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css']
})
export class CarRegistrationComponent implements OnInit {

  userObject: User;
  // for drivers
  carObject: Car;
  carMake: string;
  carModel: string;
  carYear: number;
  optInToDrive: boolean;

  // booleans for car information buttons
  btnCarInfo: Number = 0;

  constructor(private userService: UserControllerService) { }

  ngOnInit() {
  }

  addCarToUser() {
    this.carObject.id = 0;
    this.carObject.make = this.carMake;
    this.carObject.model = this.carModel;
    // this.carObject.owner = this.userObject.;
    this.carObject.year = this.carYear;
    // this.userObject.cars.push(this.carObject);

    this.userService.createCar(this.carObject).subscribe(car => {
      this.carObject = car;
    });

  }

  refreshFields() {
    this.carMake = '';
    this.carModel = '';
    this.carYear = new Date().getFullYear();
  }

}
