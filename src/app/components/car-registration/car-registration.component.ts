import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  carObject: Car = new Car;
  
  /**
   * variables to take in user input
   */
  make:string;
  model:string;
  year:number;
  color:string;
  license:string;
  state:string;

  //prints out if update is successful or not
  success:string;

  /**
   * Sets up the Car Registration component with dependencies
   * @param {UserControllerService} userService - the Service that allows us to manager the user AND the cars available on the system
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private userService: UserControllerService,
    private route: Router,
    private http: HttpClient 
    )
  {

  }

  /**
   * Makes sure there is a car object available to operate on
   */
  ngOnInit() {

    this.success = "";
  }


  submitAutomobile() {

    this.userService.getCurrentUser().subscribe(e => {
      this.userObject = e;

      console.log(JSON.parse(JSON.stringify(e)));
      this.carObject.owner = ("/users/" + e.id);
      this.carObject.make = this.make.toUpperCase();
      this.carObject.model = this.model.toUpperCase();
      this.carObject.year = this.year;
      this.carObject.color = this.color.toUpperCase();
      this.carObject.license = this.license.toUpperCase();
      this.carObject.state = this.state.toUpperCase();

      console.log(this.carObject);
      console.log(environment.userUrl + e.cars);


      if(e.cars.length == 0) {
        this.http.post<Car>(environment.userUrl + '/cars/', this.carObject, {observe: 'response'}).subscribe(response => {
          if(response.status == 201)
            this.success = "Success";
          else
            this.success = "Failed";

        });
      }
      else {
        this.http.put<Car>(environment.userUrl + e.cars, this.carObject, {observe: 'response'}).subscribe(response => {
        if(response.status == 200)
          this.success = "Success";
        else
          this.success = "Failed";
        
        });
      }
    });
  }

}
