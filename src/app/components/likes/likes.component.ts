import { Component, OnInit } from '@angular/core';
import { SwipecardModel } from '../../models/swipecard.model';
import { Role } from '../../models/role.model';

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
            role: Role.Driver,
            cars: [],
            contactInfo: [],
            active: true,
            photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
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
            role: Role.Driver,
            cars: [],
            contactInfo: [],
            active: true,
            photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
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
            role: Role.Driver,
          cars: [],
          contactInfo: [],
          active: true,
          photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
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
            role: Role.Driver,
          cars: [],
          contactInfo: [],
          active: true,
          photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      visible: false
  }

];

  constructor() { }

  ngOnInit() {

  }

}
