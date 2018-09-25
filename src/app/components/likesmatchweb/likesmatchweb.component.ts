import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Role } from '../../models/role.model';
import { Link } from '../../models/link.model';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';

interface UserCard {
    user: User;
    choose: string;
    face: String;
}

@Component({
    selector: 'app-likesmatchweb',
    templateUrl: './likesmatchweb.component.html',
    styleUrls: ['./likesmatchweb.component.css'],
    animations: [
        trigger('flip', [
            state('front', style({ transform: 'rotateY(0deg)' })),
            state('front-back', style({ transform: 'rotateY(90deg' })),
            state('back', style({ transform: 'rotateY(180deg)' })),
            state('back-front', style({ transform: 'rotateY(90deg' })),
            transition('* => *', animate(400))
        ])
    ]
})


export class LikesmatchwebComponent implements OnInit {

    likecards: UserCard[] = [];

    constructor(private matchService: MatchingControllerService, private userService: UserControllerService) { }

    currentUser: User;

    ngOnInit() {
        this.userService.getCurrentUser().subscribe(
            data => {
                this.currentUser = data;
                let userLinks: Link<User>[] = null;
                this.matchService.getLikedDrivers(this.currentUser.id).subscribe(
                    data2 => {
                        console.log(data2);
                        userLinks = data2;
                        for (let i = 0; i < userLinks.length; i++) {
                            console.log(userLinks[i].replace(/\D/g, ''));
                            const id: number = +userLinks[i].replace(/\D/g, '')[0];
                            this.userService.getUserById(id).subscribe(
                                data3 => {
                                    if (!data3.photoUrl || data3.photoUrl === 'null') {
                                        data3.photoUrl = 'http://semantic-ui.com/images/avatar/large/chris.jpg';
                                    }
                                    const card: UserCard = {
                                        user: data3,
                                        choose: 'none',
                                        face: 'front'
                                    };
                                    this.likecards.push(card);
                                }
                            );
                        }
                    }
                );
            }
        );


    }


    // Sets the card to rotate 90 degrees
    flipCard(card: UserCard) {
        if (card.face === 'front') {
            card.face = 'front-back';
        } else if (card.face === 'back') {
            card.face = 'back-front';
        }
    }

    // Card goes past 90 degrees and changes face
    endFlipCard(card: UserCard) {
        if (card.face === 'front-back') {
            card.face = 'back';
        } else if (card.face === 'back-front') {
            card.face = 'front';
        }
    }

}
