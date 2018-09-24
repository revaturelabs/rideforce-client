import { Component, OnInit } from '@angular/core';
import { SwipecardModel } from '../../models/swipecard.model';


@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  swipecards: SwipecardModel[ ] = [
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
            photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
            role: Role.Driver
        },
        visible: false
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
            photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
            role: Role.Driver
        },
        visible: false
    },
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
          photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
          role: Role.Driver
      },
      visible: false
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
          photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
          role: Role.Driver
      },
      visible: false
  }

];

  constructor() { }

  ngOnInit() {

  }

}
