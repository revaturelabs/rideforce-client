import { Component } from '@angular/core';
import { Auth0Service} from './services/auth0.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  password: string;
  confirmPassword: string;

  constructor(public auth0: Auth0Service){
    auth0.handleAuthentication();
  }
  onTap(event) {
    console.log(event);
  }

 
}


