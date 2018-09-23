import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  password: string;
  confirmPassword: string;

  onTap(event) {
    console.log(event);
  }
}


