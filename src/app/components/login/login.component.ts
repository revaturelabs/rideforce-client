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
    console.log('in login');
    this.authService.authenticate(this.userEmail, this.userPass).subscribe(
      () => {
        this.route.navigate(['/landing']);
        
      },
      // TODO if an error is returned, return the error message to user
      //callback called if there is an error
      e => {
        //error coming from the backend
        document.getElementById("errorMessageLogin").style.display="block";
        document.getElementById("errorMessageLogin").innerHTML=e.message;
      }

    );
  }

}
