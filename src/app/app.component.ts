import { Component } from '@angular/core';


/**
 * Serves as the root component for the entire page
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** Provides a basic title */
  title = 'app';
  /** Provides a password for the user */
  password: string;
  /** Confirms the user password */
  confirmPassword: string;

  /** Log any tap that the system detects */
  onTap(event) {
    console.log(event);
  }


}


