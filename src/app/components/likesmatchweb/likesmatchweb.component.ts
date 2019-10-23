import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Link } from '../../models/link.model';
// import { MatchingControllerService } from '../../services/api/matching-controller.service';
// import { UserControllerService } from '../../services/api/user-controller.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
// import { AuthService } from '../../services/auth.service';

/**
 * Used as a more complex data structure for holding info on liked users
 */
export interface UserCard {
    /** The Driver that they like */
    user: User;
    /** (Unknown) */
    choose: string;
    /** Status of the User */
    face: String;
}

/**
 * Component that shows User Likes on a desktop device
 */
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

    /**
     * Array of data structures that hold list of the User's liked drivers
     */
    likecards: UserCard[] = [];

    principal : User;

    /**
     * Sets up the Component for Like demonstrations
     * @param {MatchingControllerService} matchService - Access to Rider Driver matching service
     * @param {UserControllerService} userService - Access to user services
     * @param {Router} route - Allows Nav compnent to switch between sub-components
     */
    constructor(
        // private matchService: MatchingControllerService,
        // private userService: UserControllerService,
        private route: Router,
        // private authService: AuthService
        ) { }

    /**
     * Hold the current user
     */
    currentUser: User;

    /**
     * Initializes the Component by populating the swipcards array with data on liked drivers
     */
    ngOnInit() {
    //     this.authService.principal.subscribe(user => {
    //         this.principal = user
    //     if (this.principal.id < 1)
    //       this.route.navigate(["/landing"]);
    //     this.userService.getCurrentUser().subscribe(
    //         data => {
    //             console.log('this is put into currentUser');
    //             console.log(data);
    //             this.currentUser = data;
    //             let userLinks: Link<User>[] = null;
    //             this.matchService.getLikedDrivers(this.currentUser.id).subscribe(
    //                 data2 => {
    //                     console.log('here?');
    //                     console.log(data2);
    //                     console.log('loggeddata2');
    //                     userLinks = data2;
    //                     for (let i = 0; i < userLinks.length; i++) {
    //                         console.log(userLinks[i].replace(/\D/g, ''));
    //                         const id: number = +userLinks[i].replace(/\D/g, '');
    //                         this.userService.getUserById(id).subscribe(
    //                             data3 => {
    //                                 if (!data3.photoUrl || data3.photoUrl === 'null') {
    //                                     console.log(data3.contactInfo[0]);
    //                                     data3.photoUrl = 'https://s3.us-east-1.amazonaws.com/rydeforce/rydeforce-s3/65600312303b.png';
    //                                 }
                                    
    //                                 for(let contact in data3.contactInfo){
    //                                     let num = +data3.contactInfo[contact].substring(14);
    //                                     this.userService.getContactInfoById(num).subscribe(
    //                                         data4=>{
    //                                             if(data4.info!=null){
    //                                                 if(data3.contactInfo!=null && data3.contactInfo!=undefined){
    //                                                     console.log("adding at... data3.contactInfo["+contact+"]");
    //                                                     data3.contactInfo[contact]=`${data4.type}: ${data4.info}`;
    //                                                 }
    //                                             }
    //                                         }
    //                                     )
    //                                 }
    //                                 const card: UserCard = {
    //                                     user: data3,
    //                                     choose: 'none',
    //                                     face: 'front'
    //                                 };

    //                                 this.likecards.push(card);
    //                             }
    //                         );
    //                     }
    //                 }
    //             );
    //         }
    //     );
    // });
    }


    /**
     *  Sets the card to rotate 90 degrees
     */
    flipCard(card: UserCard) {
        if (card.face === 'front') {
            card.face = 'front-back';
        } else if (card.face === 'back') {
            card.face = 'back-front';
        }
    }

    /**
     * Card goes past 90 degrees and changes face
     */
    endFlipCard(card: UserCard) {
        if (card.face === 'front-back') {
            card.face = 'back';
        } else if (card.face === 'back-front') {
            card.face = 'front';
        }
    }

}
