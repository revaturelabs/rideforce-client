import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(
    private userService: UserControllerService,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
    if(this.userService.getCurrentUser()){
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    };
  }

  logout(){
    this.authService.logout();
    this.route.navigate['/landing'];
  }

}
