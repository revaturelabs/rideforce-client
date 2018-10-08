import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserControllerService } from '../../services/api/user-controller.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser: User;
  constructor(private userService: UserControllerService) { }

  ngOnInit() {
    this.userService.getCurrentUserObservable().subscribe(
      data => {
        this.currentUser = data;
      }
    );
  }
  //   this.userService.getCurrentUserObservable().subscribe(
  //   data => {
  //     this.currentUser = data;
  //     console.log(this.currentUser)
  //   }
  // );
    this.sessionCheck()
  }

  session : boolean
  sessionCheck() {
    if(sessionStorage.length > 0) {
      this.session = true;
    } else {
      this.session = false;
    }
  }



}
