import { Component, OnInit } from '@angular/core';
import { SwipecardModel } from '../../models/swipecard.model';
import { Role } from '../../models/role.model';
import { Link } from '../../models/link.model';
import { User } from '../../models/user.model';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';


@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

    swipecards: SwipecardModel[] = [];

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
                            const id: number = +userLinks[i].replace(/\D/g, '')[1];
                            this.userService.getUserById(id).subscribe(
                                data3 => {
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
