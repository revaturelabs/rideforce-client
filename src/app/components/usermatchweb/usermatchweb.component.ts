import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';

@Component({
  selector: 'app-usermatchweb',
  templateUrl: './usermatchweb.component.html',
  styleUrls: ['./usermatchweb.component.css']
})
export class UsermatchwebComponent implements OnInit {

  users: User[] = [
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
