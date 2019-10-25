import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
@Injectable()
export class ViewUsersComponent implements OnInit {
  /** Holds the list of all users in the system */
  users: User[] = [];


  constructor(
    private router: Router,
    private userService: UserService,
    private mapsService: MapsService
  ) { }

  // add a method allDrivers in userService(), show the ones that are within 20 miles.
  ngOnInit() {
    this.showAllDrivers();
  }

  allDrivers: Observable<User[]> = this.userService.allDrivers();


  showAllDrivers() {
    this.allDrivers.subscribe(
      //function to execute when the Observable 
      //receives information
      (response) => {
        this.users = response;
        //const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const currentUser = {
          uid: 1,
          email: 'this.userEmail',
          password: 'this.userPass',
          fname: 'Testfirst',
          lname: 'Testlast',
          // roles: [{rid: 1, rname: 'Driver'}],
          roles: [{ id: 1, rname: 'Rider' }],
          location: {
            lid: 1,
            address: '555 Test Street',
            city: 'Morgantown',
            state: 'WV',
            zip: '55555',
            longitude: -79.9247098,
            latitude: 39.6566119
          },
          distance: "",
          isActive: true
        };
        this.users.forEach(user => {
          console.log("Hello");
          var origin = new google.maps.LatLng(currentUser.location.latitude, currentUser.location.longitude);
          var destination = new google.maps.LatLng(user.location.latitude, user.location.longitude);
          new google.maps.DistanceMatrixService().getDistanceMatrix({ 'origins': [origin], 'destinations': [destination], travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.IMPERIAL  }, (results: any) => {
            console.log("hello2");
            console.log(results);
            user.distance = results.rows[0].elements[0].distance.text;


          });



          // (response2) => {
          //   console.log(response2.rows[0].elements[0].distance.text);
          //   user.distance = response2.rows[0].elements[0].distance.text;
          // }

        })
        console.log(this.users);
      },
      //function to execute when the Observable receives
      //incorrect/faulty information
      (response) => {
        console.log("Sorry it failed" + response);
      }
      //optional third function for what to do when
      //the call is complete
    );
  }

}
