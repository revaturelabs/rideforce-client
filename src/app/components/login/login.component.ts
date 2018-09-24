import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPass: string;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.authenticate(this.userEmail, this.userPass).subscribe(
      () => {
        this.route.navigate(['/home']);
      }
      // TODO if an error is returned, return the error message to user

    );
  }  

}
