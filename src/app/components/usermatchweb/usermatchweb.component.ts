import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Login } from "../../models/login.model";
import { Link } from "../../models/link.model";
import { DriverCard } from "../../models/driver-card.model";
import { User } from "../../models/user.model";
// import { MatchingControllerService } from "../../services/api/matching-controller.service";
// import { UserControllerService } from "../../services/api/user-controller.service";
// import { AuthService } from "../../services/auth.service";
// import { GeocodeService } from "../../services/geocode.service";
// import { DownloadService } from "../../services/download.service";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Allows Views for Other Users in a desktop view
 */
@Component({
  selector: "app-usermatchweb",
  templateUrl: "./usermatchweb.component.html",
  styleUrls: ["./usermatchweb.component.css"],
  animations: [
    trigger("flip", [
      state("front", style({ transform: "rotateY(0deg)" })),
      state("front-back", style({ transform: "rotateY(90deg" })),
      state("back", style({ transform: "rotateY(180deg)" })),
      state("back-front", style({ transform: "rotateY(90deg" })),
      transition("* => *", animate(200))
    ])
  ]
})
export class UsermatchwebComponent implements OnInit {
  // Dummy data
  users: DriverCard[] = [];
  // initialize empty array for sorted users / drivers
  sortedUsers: DriverCard[] = [];

  /** to select a checkbox */
  selected: string = "none";
  /** to store user location */
  myLocation: object = null;

  principal: User;
  /**
   * Sets up Component with the Matching and User services injected
   * @param {MatchingControllerService} matchService - Enables the matching service
   * @param {UserControllerService} userService - Enables access to User management
   */
  constructor(
    // private matchService: MatchingControllerService,
    // private userService: UserControllerService,
    // private route: Router,
    private spinner: NgxSpinnerService,
    // private geocodeService: GeocodeService,
    // private auth: AuthService,
    // private ds: DownloadService,
    public ss: DomSanitizer
  ) {}

  /** Holds the current user of the system */
  currentUser: User;

  /** Whether or not to filter users by batch-end date */
  filterBatchEnd: boolean = false;
  /** Whether or not to filter users by day start-time */
  filterStartTime: boolean = false;
  /** Whether or not to filter users by Distance */
  filterDistance: boolean = false;
  /**If page is loading */
  loading: boolean;

  private imageFile: any;

  /**
   * Sets up the component by populating the list of possible matches for the current user
   */
  ngOnInit() {
    console.clear();
    // this.matchService.getMatches().subscribe(
    //   users => {
    //     this.users = [];
    //     for (let u of users) {
    //       const card: DriverCard = {
    //         user: u,
    //         choose: "none",
    //         face: "front",
    //         distance: null,
    //         image:
    //           u.photoUrl ||
    //           "http://semantic-ui.com/images/avatar/large/chris.jpg"
    //       };
    //       this.populateProfileImage(card);
          
    //       this.users.push(card);
    //     }
    //     // assign drivers to the list to render and shuffle
    //     this.sortedUsers = this.users;
    //   },
    //   e => {
    //     console.log("error getting match user!");
    //     console.log(e);
    //   }
    // );
    // this.auth.principal.subscribe(user => {
    //   this.principal = user;
    //   if (this.principal.id < 1) {
    //     this.route.navigate(["/landing"]);
    //   }
    //   this.spinner.show();
    //   this.loading = true;
    //   console.log("Loading: " + this.loading);
      
    //   this.userService.getCurrentUser().subscribe(

    //     data => {
    //       this.currentUser = data;
    //       this.matchService.getMatchingDrivers(+this.principal.id).subscribe(
    //         users => {
    //           console.log(users);
    //           this.matchService.updateMatches(users);
    //           // sets loading to false
    //           this.loading = false;
    //           // hides the spinner
    //           this.spinner.hide();
    //         },
    //         e => {
    //           console.log("error getting match Drivers!");
    //           console.log(e);
    //         }
    //       );
    //     },

    //     e => {
    //       console.log("error getting user (matching service)!");
    //       console.log(e);
    //     }

    //   );
    // });
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
        this.users[index].choose = "liked";
        // this.matchService
        //   .unDislikeDriver(this.currentUser.id, this.users[index].user.id)
        //   .subscribe();
        // this.matchService
        //   .likeDriver(this.currentUser.id, this.users[index].user.id)
        //   .subscribe(data => {});
      } else if (interest === 0) {
        this.users[index].choose = "disliked";
        // this.matchService
        //   .unlikeDriver(this.currentUser.id, this.users[index].user.id)
        //   .subscribe();
        // this.matchService
        //   .dislikeDriver(this.currentUser.id, this.users[index].user.id)
        //   .subscribe(data => {});
      } else {
        this.users[index].choose = "none";
        // this.matchService
        //   .unlikeDriver(this.currentUser.id, this.users[index].user.id)
        //   .subscribe();
        // this.matchService
        //   .unDislikeDriver(this.currentUser.id, this.users[index].user.id)
        //   .subscribe();
      }
    } else {
      if (this.users[index].choose === "disliked") {
        this.users.splice(index, 1);
      }
    }
  }

  /**
   * Sets the card to rotate 90 degrees
   * @param {DriverCard} card - the card to operate on
   */
  flipCard(card: DriverCard) {
    if (card.face === "front") {
      card.face = "front-back";
    } else if (card.face === "back") {
      card.face = "back-front";
    }
  }

  /**
   * Card goes past 90 degrees and changes face
   * @param {DriverCard} card - the card to operate on
   */
  endFlipCard(card: DriverCard) {
    if (card.face === "front-back") {
      card.face = "back";
    } else if (card.face === "back-front") {
      card.face = "front";
    }
  }

  sortDrivers(filter: string): void {
    const options = [
      [this.filterBatchEnd, "batchend"],
      [this.filterDistance, "distance"],
      [this.filterStartTime, "starttime"]
    ];

    // this.sortedUsers = this.shuffle(this.users);

    const filterMap = {
      starttime: () => {
        console.log("sorting by start time");
        this.sortedUsers = this.users.sort(
          (a, b) => a.user.startTime - b.user.startTime
        );
      },
      batchend: () => {
        console.log("sorting by batch end");
        this.sortedUsers = this.users.sort(
          (a, b) =>
            new Date(b.user.batchEnd).getTime() -
            new Date(a.user.batchEnd).getTime()
        );
      },
      distance: () => {
        console.log("sorting by distance");
        this.sortedUsers = this.users
          .sort((a, b) => b.distance - a.distance)
          .reverse();
      }
    };

    if (this.filterStartTime || this.filterDistance || this.filterBatchEnd) {
      console.log("going to filter");
      options.forEach(tuple => {
        if (tuple[0] === true) {
          console.log("sorting by " + tuple[1]);
          const value = tuple[1];
          filterMap[value.toString()]();
        }
      });
      console.log("after sorting: ", this.sortedUsers);
    } else {
      this.sortedUsers = this.users;
    }
  }

  calculateDistance(x1: number, x2: number, y1: number, y2: number): number {
    // const distance: number = Math.sqrt(Math.pow((x2 - x1), 2)/Math.pow((y2 - y1), 2));

    const radlat1 = (Math.PI * y1) / 180;
    const radlat2 = (Math.PI * y2) / 180;
    const radlong1 = (Math.PI * x1) / 180;
    const radlong2 = (Math.PI * x2) / 180;
    const theta = x1 - x2;
    const radtheta = (Math.PI * theta) / 180;
    let distance =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515;
    return distance;
  }

  // get the address and append it
  async appendLocation(user) {
    // const myLocation = await this.geocodeService
    //   .geocode(this.principal.location.address)
    //   .toPromise();
    // const location = await this.geocodeService
    //   .geocode(user.user.address)
    //   .toPromise();
    // user["distance"] = this.calculateDistance(
    //   myLocation["lng"],
    //   location["lng"],
    //   myLocation["lat"],
    //   location["lat"]
    // );
    console.log("usre with appended distance: " + user);
    return user;
  }

  async getLngLat(address: string): Promise<number> {
    // const otherLocation = await this.geocodeService
    //   .geocode(address)
    //   .toPromise();
    // const myLocation = await this.geocodeService
    //   .geocode(this.principal.location.address)
    //   .toPromise();
    // const x1 = myLocation["lng"];
    // const x2 = otherLocation["lng"];
    // const y1 = myLocation["lat"];
    // const y2 = otherLocation["lat"];
    // return this.calculateDistance(x1, x2, y1, y2);
    return null;
  }

  getMyLocation() {
    const address = this.principal.location.address;
    if (!this.myLocation) {
      this.myLocation = this.getLngLat(address);
    }
    return this.myLocation;
  }

  shuffle(list: DriverCard[]): Array<DriverCard> {
    let m = list.length,
      t: DriverCard,
      i: number;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = list[m];
      list[m] = list[i];
      list[i] = t;
    }
    return list;
  }

  public populateProfileImage(dc: DriverCard) {
    // this.ds.downloadFile(dc.user.id.toString()).subscribe(b => {
    //   dc.image = this.ss.bypassSecurityTrustUrl(window.URL.createObjectURL(b));
    // });
  }

}
