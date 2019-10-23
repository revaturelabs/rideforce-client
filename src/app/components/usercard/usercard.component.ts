import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "../../models/user.model";
import { Link } from "../../models/link.model";
import { SwipecardModel } from "../../models/swipecard.model";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
// import { MatchingControllerService } from "../../services/api/matching-controller.service";
// import { UserControllerService } from "../../services/api/user-controller.service";
import { Router } from "@angular/router";

/**
 * Allows Views for Other Users in a mobile view
 */
@Component({
  selector: "app-usercard",
  templateUrl: "./usercard.component.html",
  styleUrls: ["./usercard.component.css"],
  animations: [
    trigger("slide", [
      state("center", style({ transform: "translateX(0)" })),
      state("left", style({ transform: "translateX(-200%)" })),
      state("right", style({ transform: "translateX(200%)" })),
      transition("* => *", animate(100))
    ]),
    trigger("pop", [
      state("one", style({ transform: "scale(1)", opacity: 0 })),
      state("two", style({ transform: "scale(1.2)", opacity: 0.8 })),
      transition("one => two", animate(200)),
      transition("two => one", animate(100))
    ])
  ]
})
export class UsercardComponent implements OnInit {
  /** constant for swipe action: left or right */
  SWIPE_ACTION = { LEFT: "swipeleft", RIGHT: "swiperight" };
  /** our list of swipecards: DUMMY DATA */
  swipecards: SwipecardModel[] = [];

  /** User currently being looked at */
  currentSwipeCard: SwipecardModel;
  /** Index of the Current User being viewed */
  currentIndex = 0;
  /** Keeps track of the Animation state */
  animState = "center";
  /** Keeps track of the Thumb animation */
  animThumbState = "one";
  /** Location of the thumbnail image files */
  thumbImg = "assets/icons/thumbsDown.png";

  /** Represents the div element 'swipeMain' */
  @ViewChild("swipeMain") swipeCardMain: ElementRef;
  /** Represents the div element 'swipeBio' */
  @ViewChild("swipeBio") swipeCardBio: ElementRef;

  /**
   * Sets up Component with the Matching and User services injected
   * @param {MatchingControllerService} matchService - Enables the matching service
   * @param {UserControllerService} userService - Enables access to User management
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    // private matchService: MatchingControllerService,
    // private userService: UserControllerService,
    private route: Router
  ) {}

  /** Holds the current user of the system */
  currentUser: User;

  /**
   * Sets up the component by populating the list of possibel matches for the current user
   */
  ngOnInit() {
    if (sessionStorage.length === 0) {
      this.route.navigate(["/landing"]);
    }
    // this.matchService.getMatches().subscribe(function(users) {
    //   console.log(users);
    //   for (let u of users) {
    //     console.log(u);
    //     if (!u.photoUrl || u.photoUrl === "null") {
    //       console.log(u.photoUrl);
    //       u.photoUrl = "http://semantic-ui.com/images/avatar/large/chris.jpg";
    //     }
    //     const card: SwipecardModel = {
    //       user: u,
    //       visible: false
    //     };
    //     this.swipecards.push(card);
    //     // Sets the current swipe card to the first element of the array if the array has something in it.
    //     if (this.swipecards.length > 0) {
    //       this.currentSwipeCard = this.swipecards[0];
    //     }
    //   }
    // });
    // this.userService.getCurrentUser().subscribe(data => {
    //   console.log("data");
    //   this.currentUser = data;
    //   console.log(this.currentUser);
    //   this.matchService
    //     .getMatchingDrivers(this.currentUser.id)
    //     .subscribe(users => {
    //       console.log(users);
    //       this.matchService.updateMatches(users);
    //     });
    // });
  }

  /**
   * Hides the card picture
   *
   * @param hide
   */
  hideImage(hide: boolean) {
    if (hide) {
      this.swipeCardMain.nativeElement.classList.add("hidden");
    } else {
      this.swipeCardMain.nativeElement.classList.remove("hidden");
    }
  }

  /**
   *  action triggered when user swipes
   */
  swipe(action = this.SWIPE_ACTION.RIGHT, user) {
    this.animThumbState = "two";
    // swipe right, next avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.animState = "right";
      this.thumbImg = "assets/icons/thumbsUp.png";
      // this.matchService
      //   .unDislikeDriver(
      //     this.currentUser.id,
      //     this.swipecards[this.currentIndex].user.id
      //   )
      //   .subscribe();
      // this.matchService
      //   .likeDriver(
      //     this.currentUser.id,
      //     this.swipecards[this.currentIndex].user.id
      //   )
      //   .subscribe(data => {});
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {
      this.animState = "left";
      this.thumbImg = "assets/icons/thumbsDown.png";
      console.log(this.currentUser.id);
      console.log(this.swipecards[this.currentIndex].user.id);
      // this.matchService
      //   .unlikeDriver(
      //     this.currentUser.id,
      //     this.swipecards[this.currentIndex].user.id
      //   )
      //   .subscribe();
      // this.matchService
      //   .dislikeDriver(
      //     this.currentUser.id,
      //     this.swipecards[this.currentIndex].user.id
      //   )
      //   .subscribe(data => {});
    }
    this.swipecards.splice(this.currentIndex, 1);
  }

  /**
   * Called when the swipe animation has completed
   */
  swiped() {
    if (this.animState === "left") {
      this.animState = "center";
      if (this.currentIndex + 1 > this.swipecards.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    } else if (this.animState === "right") {
      this.animState = "center";
      if (this.currentIndex - 1 < 0) {
        this.currentIndex = this.swipecards.length - 1;
      } else {
        this.currentIndex--;
      }
    }

    // Load currentSwipeCard with the swipecard currentindex
    this.currentSwipeCard = this.swipecards[this.currentIndex];
  }

  /**
   * Called when the Thumb Animation is done
   */
  thumbAnimDone() {
    if (this.animThumbState === "two") {
      this.animThumbState = "one";
    }
  }
}
