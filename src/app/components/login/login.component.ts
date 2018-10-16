import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';

/**
 * Responsible for providing a user the ability to log in
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * The "username" of the user
   */
  userEmail: string;

  /**
   * The password associated with the indended account
   */
  userPass: string;

  /**
   * The User to log on to
   */
  currentUser: User;

  /**
   * Sets up the Login compoennt with dependency injection
   * @param { AuthService} authService - Provides the ability to authenticate the user
   * @param {Router} route - provides the ability to navigate to landing if user is already logged on
   * @param {UserControllerService} userService - (Unused) Provides cUser Functionality
   */
  constructor(private authService: AuthService, private route: Router, private userService: UserControllerService) { }

  /**
   * Checking to see if there is a current user, and if there is, redirects to landing.
   */
  ngOnInit() {
      if (sessionStorage.length > 0){
        this.route.navigate(['/landing']);
      }
    }


  // getUser(email: string) {
  //   let user;
  //   return this.userService.getUserByEmail(email).subscribe();
  // }

  /**
   * Gets the parameters from the login fields.
   * If the login fails, displays the error message sent by the server under the password field.
   */
  login() {
    this.authService.authenticate(this.userEmail, this.userPass);
  }
}
