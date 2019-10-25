import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
@Injectable()
export class ViewUsersComponent implements OnInit {
  /** Holds the list of all users in the system */
  users: User[] = [];
  

  constructor(
    private router: Router,
    private userService: UserService
    ) {}

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
        this.users = response;
        console.log(this.users);
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
