import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

interface UserCard {
  user: User;
  choose: string;
}

@Component({
  selector: 'app-usermatchweb',
  templateUrl: './usermatchweb.component.html',
  styleUrls: ['./usermatchweb.component.css']
})
export class UsermatchwebComponent implements OnInit {


  users: UserCard[] = [
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
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
      choose: 'none'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  like(index: number, interest: number) {
    if (interest !== 2) {
      if (interest === 1) {
        this.users[index].choose = 'liked';
      } else {
        this.users[index].choose = 'disliked';
      }
    } else {
      if (this.users[index].choose === 'disliked') {
        this.users.splice(index, 1);
      }
    }
  }

}
