
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { SwipecardModel } from '../../models/swipecard.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-usercard',
    templateUrl: './usercard.component.html',
    styleUrls: ['./usercard.component.css'],
    animations: [
        trigger('slide', [
            state('center', style({ transform: 'translateX(0)' })),
            state('left', style({ transform: 'translateX(-200%)' })),
            state('right', style({ transform: 'translateX(200%)' })),
            transition('* => *', animate(100))
        ]),
        trigger('pop', [
            state('one', style({ transform: 'scale(1)', opacity: 0 })),
            state('two', style({ transform: 'scale(1.2)', opacity: .8 })),
            transition('one => two', animate(200)),
            transition('two => one', animate(100))
        ])
    ]
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
                photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
                role: Role.Driver
            },
            visible: false
        }
    ];


    currentSwipeCard: SwipecardModel;
    currentIndex = 0;
    animState = 'center';
    animThumbState = 'one';
    thumbImg = '../../../assets/icons/thumbsDown.png';

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
        this.animThumbState = 'two';
        // swipe right, next avatar
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.animState = 'right';
            this.thumbImg = '../../../assets/icons/thumbsUp.png';
        }

        // swipe left, previous avatar
        if (action === this.SWIPE_ACTION.LEFT) {
            this.animState = 'left';
            this.thumbImg = '../../../assets/icons/thumbsDown.png';
        }
    }

    swiped() {
        if (this.animState === 'left') {
            this.animState = 'center';
            if (this.currentIndex + 1 > this.swipecards.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
        } else if (this.animState === 'right') {
            this.animState = 'center';
            if (this.currentIndex - 1 < 0) {
                this.currentIndex = this.swipecards.length - 1;
            } else {
                this.currentIndex--;
            }
        }
        // Load currentSwipeCard with the swipecard currentindex
        this.currentSwipeCard = this.swipecards[this.currentIndex];
    }

    thumbAnimDone() {
        if (this.animThumbState === 'two') {
            this.animThumbState = 'one';
        }
    }

}
