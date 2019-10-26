import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
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
  users: any[] = [];


  constructor(
    private router: Router,
    private userService: UserService,
    private mapsService: MapsService,
    private cdr: ChangeDetectorRef
  ) { }

  // add a method allDrivers in userService(), show the ones that are within 20 miles.
  ngOnInit() {
    this.showAllDrivers();
  }

  allDrivers: Observable<User[]> = this.userService.allDrivers();
  vicinityDrivers: any[] = [];


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
          var origin = new google.maps.LatLng(currentUser.location.latitude, currentUser.location.longitude);
          var destination = new google.maps.LatLng(user.location.latitude, user.location.longitude);
          new google.maps.DistanceMatrixService().getDistanceMatrix({ 'origins': [origin], 'destinations': [destination], travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.IMPERIAL }, (results: any) => {
            console.log(results);
            user.distance = results.rows[0].elements[0].distance.text;
            this.vicinityDrivers.push(user);
            this.vicinityDrivers.sort(this.sortDriversByDistance);
            console.log(this.vicinityDrivers);
            this.cdr.detectChanges();


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

  filterDrivers(vicinity: any) {
    console.log(vicinity);
    const newVicinityDrivers = this.users.filter(user => {
      if (user.distance !== undefined) {
        if (vicinity === "") {
          return true;
        }
        else {
          const distanceParts = user.distance.split(" ", 2);
          if (distanceParts[1] === "mi") {
            if (vicinity >= parseFloat(distanceParts[0])) {
              return true;
            }
          }
          else if (distanceParts[1] === "ft") {
            const vicinityDistanceFt = vicinity * 5280;
            if (vicinityDistanceFt >= parseFloat(distanceParts[0])) {
              return true;
            }
          }
        }
      }
    });

    newVicinityDrivers.sort(this.sortDriversByDistance);

    this.vicinityDrivers = newVicinityDrivers;
    this.cdr.detectChanges();
  }

  sortDriversByDistance(a: any, b: any) {
    const aDistanceParts = a.distance.split(" ", 2);
    const bDistanceParts = b.distance.split(" ", 2);

    if (aDistanceParts[1] === "mi") {
      aDistanceParts[0] *= 5280;
    }
    if (bDistanceParts[1] === "mi") {
      bDistanceParts[0] *= 5280;
    }
    if (aDistanceParts[0] < bDistanceParts[0]) {
      return -1;
    }
    else if (aDistanceParts[0] > bDistanceParts[0]) {
      return 1;
    }
    else {
      return 0;
    }
  }

}
