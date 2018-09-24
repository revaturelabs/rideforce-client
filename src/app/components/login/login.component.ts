import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit() {

  }

  private email: string;
  private password: string;


  login(){
    this.authSrv.authenticate(this.email, this.password).subscribe(
     data => {
        
      }
    )
  }

  

}
