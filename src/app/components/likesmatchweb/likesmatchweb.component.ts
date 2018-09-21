import { Component, OnInit } from '@angular/core';
import { SwipecardModel } from '../../models/swipecard.model';
import { User } from '../../models/user.model';

interface UserCard {
    user: User;
    choose: string;
  }

@Component({
  selector: 'app-likesmatchweb',
  templateUrl: './likesmatchweb.component.html',
  styleUrls: ['./likesmatchweb.component.css']
})


export class LikesmatchwebComponent implements OnInit {

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
