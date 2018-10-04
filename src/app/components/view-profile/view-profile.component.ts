import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  currentUser: User;
  constructor(private dateFormat: DateFormatPipe, private userService:UserControllerService) { }
  firstName : string;
  lastName : string;
  username : string;
  address2 : string;
  batchEnd : Date;
  ngOnInit() {
    this.userService.getCurrentUserObservable().subscribe(
      data => {
        this.currentUser = data;
        document.getElementById("")
        console.log(this.currentUser);
        this.firstName = this.currentUser.firstName;
        this.lastName = this.currentUser.lastName;
        this.username = this.currentUser.email;
        this.address2 = this.currentUser.address;
        this.batchEnd = new Date(this.currentUser.batchEnd);
      }
    );
  }
}
