
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { SwipecardModel } from '../../models/swipecard.model';
import { animate, state, style, transition, trigger } from '@angular/animations';


type PaneType = 'main' | 'bio';

@Component({
    selector: 'app-usercard',
    templateUrl: './usercard.component.html',
    styleUrls: ['./usercard.component.css'],
    animations: [
        trigger('slide', [
            state('up', style({ transform: 'translateY(0)' })),
            state('down', style({ transform: 'translateY(-2%)' })),
            transition('* => *', animate(100)),
        ])]
})
export class UsercardComponent implements OnInit {

    @Input() activePane: PaneType = 'main';

    // constant for swipe action: left or right
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    // our list of avatars
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
        }
    ];

    state = 'up';

    public mobile = false;
    public bioCollapsed = true;

    @ViewChild('swipeMain') swipeCardMain: ElementRef;
    @ViewChild('swipeBio') swipeCardBio: ElementRef;

    constructor() { }

    ngOnInit() {
        if (window.screen.width <= 430) { // 768px portrait
            this.mobile = true;
        }
        if (this.swipecards.length > 0) {
            this.swipecards[0].visible = true;
        }
    }
    hideMain(event: any) {
        if (this.state === 'down') {
            this.swipeCardBio.nativeElement.classList.remove('hidden');
            this.swipeCardMain.nativeElement.classList.add('hidden');
        } else {
            this.swipeCardMain.nativeElement.classList.remove('hidden');
            this.swipeCardBio.nativeElement.classList.add('hidden');
        }
    }


    animateMe() {
        this.state = (this.state === 'up' ? 'down' : 'up');
        console.log(this.state);
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
