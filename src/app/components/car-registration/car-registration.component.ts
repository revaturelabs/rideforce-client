import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

/**
 * Supports the functionality of car registration and management
 */
@Component({
  selector: 'app-car-registration',
  templateUrl: './car-registration.component.html',
  styleUrls: ['./car-registration.component.css']
})
export class CarRegistrationComponent implements OnInit {

  /**
   * The User that owns the car
   */
  userObject: User;

  // for drivers
  /**
   * The car to create and register
   */
  carObject: Car;
  /**
   * The company that manufactured it
   */
  carMake: string;

  /**
   * Model of the car
   */
  carModel: string;

  /**
   * When the car was produced
   */
  carYear: number;

  // Color
  carColor: string;

  /**
   * Relic from the AccountInfoComponent that previously managed cars
   */
  optInToDrive: boolean;

  /**
   * List of cars owned by the ownwer to present in a table
   */
  cars: Car[];

  // booleans for car information buttons
  btnCarInfo: Number = 0;

  /**
   * Sets up the Car Registration component with dependencies
   * @param {UserControllerService} userService - the Service that allows us to manager the user AND the cars available on the system
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private userService: UserControllerService,
    private route: Router
    ) {

   }

  /**
   * Makes sure there is a car object available to operate on
   */
  ngOnInit() {

  }


  submitAutomobile(make, model, year, color) {
    console.log(`Make: ${make} Model: ${model} Year: ${year} Color: ${color}`);
    this.carMake = make;
    this.carModel = model;
    this.carYear = year;
    this.carColor = color;
  }

}
