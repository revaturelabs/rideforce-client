import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-browse-driver',
  templateUrl: './browse-driver.component.html',
  styleUrls: ['./browse-driver.component.css']
})
export class BrowseDriverComponent implements OnInit {
  Name : string;
  Contact : string;
  Distance : number;
  Status : string;

  activeDrivers : User[] = [];
  constructor(private userService : UserService) { 

  }
  // add a method allDrivers in userService(), show the ones that are within 20 miles.

  ngOnInit() {
    this.showAllDrivers();
  }

  allDrivers :Observable<User[]> = this.userService.allDrivers();

  showAllDrivers() {
    this.allDrivers.subscribe(
      //function to execute when the Observable 
      //receives information
      (response) => {
        this.activeDrivers = response;
        console.log(this.activeDrivers);
      },
      //function to execute when the Observable receives
      //incorrect/faulty information
      (response) => {
        console.log("Sorry it failed" + response);
      }
      //optional third function for what to do when
      //the call is complete
    );
  }
}
