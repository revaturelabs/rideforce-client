import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(
    private userService: UserControllerService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
    // this.userService.getCurrentUserObservable().subscribe(
    //   data => {
    //     this.currentUser = data;
    //     // console.log(this.currentUser);
    //     document.getElementById("profilePic").setAttribute("src",this.currentUser.photoUrl);
    //   }
    // );
    // this.userService.getCurrentUserObservable().subscribe(
    //   data => {
    //     this.currentUser = data;
    //     // console.log(this.currentUser);
    //     document.getElementById("profilePic").setAttribute("src",this.currentUser.photoUrl);
    //   }
    // );
    this.sessionCheck();
  }

  session : boolean = sessionStorage.length > 0;
  sessionCheck() {
    if(sessionStorage.length > 0) {
      this.session = true;
    } else {
      this.session = false;
    }
  }
  
  // async logout() {
  //   this.authService.logout();
  //   if(this.route.url === "/landing") {
  //     location.reload(true);
  //   } else {
  //     await this.route.navigate(["/landing"]);
  //     location.reload(true);
  //   }
  
  logout() {
    this.authService.logout();
    this.route.navigate(['/landing']);
  }

  filter() {
    
  }
}
