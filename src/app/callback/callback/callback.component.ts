import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  /**
   * Callback is a thing required by Auth0, it basically is the sitting place for 
   * RideForce to go to while waiting for the Auth0 remote login page to return
   */
  constructor() { }

  ngOnInit() {
  }

}
