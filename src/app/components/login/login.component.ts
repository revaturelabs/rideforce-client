import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPass: string;
  currentUser: User;

  constructor(private authService: AuthService, private route: Router,private userService: UserControllerService) { }

  /**
   * Checking to see if there is a current user, and if there is, redirects to landing.
   */
  ngOnInit() {
      if(sessionStorage.length > 0){
        this.route.navigate(['/landing']);
      }
    }

  /**
   * Gets the parameters from the login fields. 
   * If the login fails, displays the error message sent by the server under the password field.
   */
  // getUser(email: string) {
  //   let user;
  //   return this.userService.getUserByEmail(email).subscribe();
  // }

  login() {
    this.authService.authenticate(this.userEmail, this.userPass);
  }
}
