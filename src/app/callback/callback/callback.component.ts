import { Component, OnInit } from '@angular/core';

 /**
   * Callback is a thing required by Auth0, it basically is the sitting place for
   * RideForce to go to while waiting for the Auth0 remote login page to return
   */
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
