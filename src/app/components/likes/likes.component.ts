import { Component, OnInit } from '@angular/core';
import { SwipecardModel } from '../../models/swipecard.model';
import { Role } from '../../models/role.model';
import { Link } from '../../models/link.model';
import { User } from '../../models/user.model';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';

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

    /**
     * Sets up the Component for Like demonstrations
     * @param matchService - Access to Rider Driver matching service
     * @param userService - Access to user services
     */
    constructor(private matchService: MatchingControllerService, private userService: UserControllerService) { }

    /**
     * Hold current user
     */
    currentUser: User;

    /**
     * Initializes the Component by populating the swipcards array with data on liked drivers
     */
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
                            const id: number = +userLinks[i].replace(/\D/g, '');
                            this.userService.getUserById(id).subscribe(
                                data3 => {
                                    console.log(data3);
                                    if (!data3.photoUrl || data3.photoUrl === 'null') {
                                        data3.photoUrl = 'http://semantic-ui.com/images/avatar/large/chris.jpg';
                                    }
                                    const card: SwipecardModel = {
                                        user: data3,
                                        visible: false
                                    };
                                    this.swipecards.push(card);
                                }
                            );
                        }
                    }
                );
            }
        );
    }
}
