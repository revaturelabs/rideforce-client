import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Link } from '../../models/link.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Filter } from '../../models/filter';

interface UserCard {
  user: User;
  choose: string;
  face: String;
}

@Component({
  selector: 'app-usermatchweb',
  templateUrl: './usermatchweb.component.html',
  styleUrls: ['./usermatchweb.component.css'],
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
export class UsermatchwebComponent implements OnInit {

  // Dummy data
  users: UserCard[] = [];
  constructor(private matchService: MatchingControllerService, private userService: UserControllerService) { }

  currentUser: User;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        let userLinks: Link<User>[] = null;
        this.matchService.getMatchingDrivers(this.currentUser.id).subscribe(
          data2 => {
            // console.log("data2 is " + data2);
            userLinks = data2;
            for (let i = 0; i < userLinks.length; i++) {

              this.matchService.getFromLink(userLinks[i]).subscribe(
                data3 => {
                  if (!data3.photoUrl || data3.photoUrl === 'null') {
                    data3.photoUrl = 'http://semantic-ui.com/images/avatar/large/chris.jpg';
                  }
                  const card: UserCard = {
                    user: data3,
                    choose: 'none',
                    face: 'front'
                  };
                  this.users.push(card);
                  // Sets the current swipe card to the first element of the array if the array has something in it.
                }
              );
            }
          }
        );
      }
    );
  }

  like(index: number, interest: number) {
    /**
     * interest:
     * 0 - dislike
     * 1 - like
     * 2 - trash
     * 3 - clear
     */
    if (interest !== 2) {
      if (interest === 1) {
        this.users[index].choose = 'liked';
        this.matchService.unDislikeDriver(this.currentUser.id, this.users[index].user.id).subscribe();
        this.matchService.likeDriver(this.currentUser.id, this.users[index].user.id).subscribe(
          data => {
          }
        );
      } else if (interest === 0) {
        this.users[index].choose = 'disliked';
        this.matchService.unlikeDriver(this.currentUser.id, this.users[index].user.id).subscribe();
        this.matchService.dislikeDriver(this.currentUser.id, this.users[index].user.id).subscribe(
          data => {
          }
        );
      } else {
        this.users[index].choose = 'none';
        this.matchService.unlikeDriver(this.currentUser.id, this.users[index].user.id).subscribe();
        this.matchService.unDislikeDriver(this.currentUser.id, this.users[index].user.id).subscribe();
      }
    } else {
      if (this.users[index].choose === 'disliked') {
        this.users.splice(index, 1);
      }
    }
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

  filter() {
    for(var i = 0; i < document.getElementsByTagName("input").length; i++) {

    }
  }

}
