import { Component, OnInit } from '@angular/core';
import { SwipecardModel } from '../../models/swipecard.model';
import { Link } from '../../models/link.model';
import { User } from '../../models/user.model';
// import { MatchingControllerService } from '../../services/api/matching-controller.service';
// import { UserControllerService } from '../../services/api/user-controller.service';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';

/**
 * Component that shows User Likes on a mobile device
 */
@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

    /**
     * Array of data structures that hold list of the User's liked drivers
     */
    swipecards: SwipecardModel[] = [];


    principal: User;
    /**
    //Sets up the Component for Like demonstrations
   * @param {Router} route - Allows Nav compnent to switch between sub-components
     * @param matchService - Access to Rider Driver matching service
     * @param userService - Access to user services
     */
    constructor(
        private route: Router,
        // private matchService: MatchingControllerService,
        // private userService: UserControllerService,
        // private authService: AuthService
    ) { }

    /**
     * Hold current user
     */
    currentUser: User;

    /**
     * Initializes the Component by populating the swipcards array with data on liked drivers
     */
    ngOnInit() {
        // this.authService.principal.subscribe(user => {
        //     this.principal = user;
        //     if (this.principal.id <1)
        //         this.route.navigate(["/landing"]);
        //     this.userService.getCurrentUser().subscribe(
        //         data => {
        //             this.currentUser = data;
        //             let userLinks: Link<User>[] = null;
        //             this.matchService.getLikedDrivers(this.currentUser.id).subscribe(
        //                 data2 => {
        //                     console.log(data2);
        //                     userLinks = data2;
        //                     for (let i = 0; i < userLinks.length; i++) {
        //                         console.log(userLinks[i].replace(/\D/g, ''));
        //                         const id: number = +userLinks[i].replace(/\D/g, '');
        //                         this.userService.getUserById(id).subscribe(
        //                             data3 => {
        //                                 console.log(data3);
        //                                 if (!data3.photoUrl || data3.photoUrl === 'null') {
        //                                     data3.photoUrl = 'http://semantic-ui.com/images/avatar/large/chris.jpg';
        //                                 }
        //                                 for (let car in data3.cars) {
        //                                     let num = +data3.cars[car].substring(6);
        //                                     console.log(data3.cars[car].substring(6));
        //                                     this.userService.getCarById(num).subscribe(
        //                                         data4 => {
        //                                             if (data4.year != null) {
        //                                                 console.log("data3.cars[" + car + "];")
        //                                                 data3.cars[car] = `${data4.year} ${data4.make} ${data4.model}`;
        //                                             }
        //                                         }
        //                                     )
        //                                 }
        //                                 for (let contact in data3.contactInfo) {
        //                                     let num = +data3.contactInfo[contact].substring(14);
        //                                     this.userService.getContactInfoById(num).subscribe(
        //                                         data4 => {
        //                                             if (data4.info != null) {
        //                                                 if (data3.contactInfo != null && data3.contactInfo != undefined) {
        //                                                     console.log("adding at... data3.contactInfo[" + contact + "]");
        //                                                     data3.contactInfo[contact] = `${data4.type}: ${data4.info}`;
        //                                                 }
        //                                             }
        //                                         }
        //                                     )
        //                                 }
        //                                 const card: SwipecardModel = {
        //                                     user: data3,
        //                                     visible: false
        //                                 };
        //                                 this.swipecards.push(card);
        //                             }
        //                         );
        //                     }
        //                 }
        //             );
        //         }
        //     );
        // });
    }
}
