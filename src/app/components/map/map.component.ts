import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { MapsControllerService } from '../../services/api/maps-controller.service';
import { Location } from './../../models/location.model';
import { User } from '../../models/user.model';

declare var google: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    NgbTabset
  ]
})
export class MapComponent implements OnInit, AfterViewInit {

  private start = 'herndon';
  private end = 'dc';

  private dist: number;
  private time: number;
  @ViewChild('gmap') gmapElement: any;

  private map: google.maps.Map;




  // Dummy data
  users: any[] = [
    {
      user: {
        id: 1,
        firstName: 'kristy',
        lastName: 'Kreme',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
      },
      location: {
        latitude: 38.9586,
        longitude: -77.3570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Frank',
        lastName: 'frankse',
        email: 'email@mail.com',
        address: '123',
        office: '2',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      location: {
        latitude: 39.9586,
        longitude: -77.3470
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Jimbo',
        lastName: 'Jank',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg'
      },
      location: {
        latitude: 38.3586,
        longitude: -77.1570
      }
    }, {
      user: {
        id: 1,
        firstName: 'kristy',
        lastName: 'Kreme',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
      },
      location: {
        latitude: 39.9586,
        longitude: -75.3570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Frank',
        lastName: 'frankse',
        email: 'email@mail.com',
        address: '123',
        office: '2',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      location: {
        latitude: 38.9486,
        longitude: -77.3210
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Jimbo',
        lastName: 'Jank',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg'
      },
      location: {
        latitude: 40.9586,
        longitude: -75.3570
      }
    }, {
      user: {
        id: 1,
        firstName: 'kristy',
        lastName: 'Kreme',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
      },
      location: {
        latitude: 38.2586,
        longitude: -77.1570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Frank',
        lastName: 'frankse',
        email: 'email@mail.com',
        address: '123',
        office: '2',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      location: {
        latitude: 36.9586,
        longitude: -77.2570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Jimbo',
        lastName: 'Jank',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg'
      },
      location: {
        latitude: 38.92386,
        longitude: -77.2170
      }
    }
  ];


  constructor(private mapService: MapsControllerService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const mapProp = {
      center: new google.maps.LatLng(38.9586, -77.3570),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      const icon = {
        url: user.user.photoUrl,
        // This marker is 20 pixels wide by 32 pixels high.
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 0),
      };
      const myLatlng = new google.maps.LatLng(user.location.latitude, user.location.longitude);
      const marker = new google.maps.Marker({
        icon: icon,
        position: myLatlng,
        opacity: .95,
        title: user.user.firstName + ' ' + user.user.lastName
      });
      marker.setMap(this.map);
    }
  }

  public getRoute() {
    this.mapService.getRoute(this.start, this.end).subscribe(
      data => {
        this.dist = data.distance;
        this.time = data.duration;
        console.log(this.dist);
        console.log(this.time);
      }
    );
  }
}
