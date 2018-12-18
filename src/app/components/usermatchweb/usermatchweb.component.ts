import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Link } from '../../models/link.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Router } from '@angular/router';
import { Filter } from '../../models/filter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThrowStmt } from '@angular/compiler';
import { GeocodeService } from '../../services/geocode.service';

/** Represents the User selection item in the html page */
interface UserCard {
  /** The User being represented */
  user: User;
  /** The status of the given user */
  choose: string;
  /** Link to profile picture of the user */
  face: String;
}

/**
 * Allows Views for Other Users in a desktop view
 */
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
  // initialize empty array for sorted users / drivers
  sortedUsers: UserCard[] = [];
  /**
     * Sets up Component with the Matching and User services injected
     * @param {MatchingControllerService} matchService - Enables the matching service
     * @param {UserControllerService} userService - Enables access to User management
     */
  constructor(
    private matchService: MatchingControllerService,
    private userService: UserControllerService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private geocodeService: GeocodeService
  ) { }

  /** Holds the current user of the system */
  currentUser: User;

  /** Whether or not to filter users by batch-end date */
  filterBatchEnd: boolean;
  /** Whether or not to filter users by day start-time */
  filterStartTime: boolean;
  /** Whether or not to filter users by Distance */
  filterDistance: boolean;
  /**If page is loading */
  loading: boolean;

  /**
   * Sets up the component by populating the list of possibel matches for the current user
   */
  ngOnInit() {
    if (sessionStorage.length == 0) {
      this.route.navigate(['/landing']);
    }
    this.spinner.show();
    this.loading = true;
    console.log("Loading: " + this.loading);
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        
        let userLinks: Link<User>[] = null;
        this.matchService.getMatchingDrivers(+(sessionStorage.getItem("id"))).subscribe(
          data2 => {
            // console.log("data2 is " + data2);
            userLinks = data2;
            console.log(userLinks);
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
                  // Sets the current swipe card to the first element of the array if the array has something in it.
                  this.users.push(card);
                  // assign drivers to the list to render and shuffle
                  this.sortedUsers = this.shuffle(this.users);
                  // sets loading to false
                  this.loading = false;
                  //hides the spinner
                  this.spinner.hide();
                },
                e => {
                  console.log('error getting match user!');
                  console.log(e);
                }
              );
            }
          },
          e => {
            console.log('error getting match Drivers!');
            console.log(e);
          }
        );
      },
      e => {
        console.log('error getting user (matching service)!');
        console.log(e);
      }
    );
  }

  /**
   * Handles verdict a user gives on a potential match
   * @param {number} index - The user being evaluated
   * @param {number} interest - the judgment on the viewed user
   */
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

  /**
   * Sets the card to rotate 90 degrees
   * @param {UserCard} card - the card to operate on
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
   * @param {UserCard} card - the card to operate on
   */
  endFlipCard(card: UserCard) {
    if (card.face === 'front-back') {
      card.face = 'back';
    } else if (card.face === 'back-front') {
      card.face = 'front';
    }
  }

  // filter() {
  //   for(var i = 0; i < document.getElementsByTagName("input").length; i++) {

  //   }
  // }

  /**
   * Updates the filter each time a filter checkbox is clicked
   */
  updateFilter() {
    const userFilter: Filter = {
      batchEndChange: this.filterBatchEnd,
      dayStartChange: this.filterStartTime,
      distanceChange: this.filterDistance
    };

    this.matchService.getFilteredDrivers(this.currentUser.id, userFilter).then(
      (users) => {
        this.users = [];
        for (const u of users) {
          if (!u.photoUrl || u.photoUrl === 'null') {
            u.photoUrl = 'http://semantic-ui.com/images/avatar/large/chris.jpg';
          }
          const card: UserCard = {
            user: u,
            choose: 'none',
            face: 'front'
          };
          this.users.push(card);
        }


      },
      (e) => console.log(e)
    );
  }

  sortDrivers(filter: string): void {
    let filterMap = {
      "startTime": () => { 
        console.log('sorting by start time')
        this.sortedUsers = this.users.sort((a, b) => a.user.startTime - b.user.startTime)
      },
      "batchEnd": () => {
        console.log('sorting by batch end');
        this.sortedUsers = this.users.sort((a, b) => b.user.batchEnd - a.user.batchEnd)
      } 

      }
    if (this.filterStartTime || this.filterDistance || this.filterBatchEnd) {
        console.log('going to filter')
        filterMap[filter]();
        console.log("after sorting: ", this.sortedUsers)
      } else {
        this.sortedUsers = this.users;
      }
    }

    // async calculateDistance(address: string): Promise<number> {
    //   const myLocation = await this.getMyLocation();
    //   const otherLocation = await this.getLonLatFromAddress(address);
    //   console.log('lon, lat calculated as: ' + otherLocation);
    //   return 1;

    // }
  
    getMyLocation() {
      return navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }

    // async getLonLatFromAddress(address: string): Promise<object> {
    //   const result = await this.geocodeService.geocode(address).toPromise().then(res => {console.log(res); return res});
    //   return result;
    // }

    shuffle(list: UserCard[]): Array<UserCard> {
      var m = list.length, t: UserCard, i: number;
      while (m) {
        i = Math.floor(Math.random() * m--);

        t = list[m];
        list[m] = list[i];
        list[i] = t;
      }
      return list;
    }
  }
