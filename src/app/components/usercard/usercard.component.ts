
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { SwipecardModel } from '../../models/swipecard.model';

import { trigger, keyframes, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {


 // constant for swipe action: left or right
 SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
   // our list of avatars
 swipecards: SwipecardModel[] = [
  {
        user: {
            userID: 1,
            firstname: 'kristy',
            lastname: 'Kreme',
            email: 'email@mail.com',
            roleID: 1,
            officeID: 2,
            photourl: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
        },
        visible: true
    }
];



  animationState: string;

  constructor() { }

  ngOnInit() {
  }

   // action triggered when user swipes
   swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT, event) {
       // out of range
       if (currentIndex > this.swipecards.length || currentIndex < 0) {
          return;
       }

       let nextIndex = 0;

       // swipe right, next avatar
       if (action === this.SWIPE_ACTION.RIGHT) {
           const isLast = currentIndex === this.swipecards.length - 1;
           nextIndex = isLast ? 0 : currentIndex + 1;
       }

       // swipe left, previous avatar
       if (action === this.SWIPE_ACTION.LEFT) {
           const isFirst = currentIndex === 0;
           nextIndex = isFirst ? this.swipecards.length - 1 : currentIndex - 1;
       }

       // toggle avatar visibility
       this.swipecards.forEach((x, i) => x.visible = (i === nextIndex));
   }


}
