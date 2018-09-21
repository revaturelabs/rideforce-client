
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { SwipecardModel } from '../../models/swipecard.model';


@Component({
    selector: 'app-usercard',
    templateUrl: './usercard.component.html',
    styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {

    // constant for swipe action: left or right
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    // our list of swipecards: DUMMY DATA
    swipecards: SwipecardModel[] = [
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
        }, {
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
            visible: false
        }
    ];


    currentSwipeCard: SwipecardModel;
    currentIndex = 0;

    @ViewChild('swipeMain') swipeCardMain: ElementRef;
    @ViewChild('swipeBio') swipeCardBio: ElementRef;

    constructor() { }

    ngOnInit() {
        // Sets the current swipe card to the first element of the array if the array has something in it.
        if (this.swipecards.length > 0) {
            this.currentSwipeCard = this.swipecards[0];
        }
    }

    /**
     * Hides the card picture
     *
     * @param hide
     */
    hideImage(hide: boolean) {
        if (hide) {
            this.swipeCardMain.nativeElement.classList.add('hidden');
        } else {
            this.swipeCardMain.nativeElement.classList.remove('hidden');
        }
    }

    // action triggered when user swipes
    swipe(action = this.SWIPE_ACTION.RIGHT, event) {

        // swipe right, next avatar
        if (action === this.SWIPE_ACTION.RIGHT) {
            if (this.currentIndex - 1 < 0) {
                this.currentIndex = this.swipecards.length - 1;
            } else {
                this.currentIndex--;
            }
        }

        // swipe left, previous avatar
        if (action === this.SWIPE_ACTION.LEFT) {
            if (this.currentIndex + 1 > this.swipecards.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
        }

        // Load currentSwipeCard with the swipecard currentindex
        this.currentSwipeCard = this.swipecards[this.currentIndex];
    }


}
