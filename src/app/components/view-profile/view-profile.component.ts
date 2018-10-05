import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
//import { DateFormatPipe } from '../../pipes/date-format.pipe';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  currentUser: User;
  constructor(private userService:UserControllerService) { }
  firstName : string;
  lastName : string;
  username : string;
  address2 : string;
  batchEnd : any;
  canEdit : boolean = false;
  
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
        this.batchEnd = new Date(this.currentUser.batchEnd).toLocaleDateString();
      }
    );
  }

  edit() {
    document.getElementById("firstName").removeAttribute("disabled");
    document.getElementById("lastName").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");
    document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById("address").removeAttribute("disabled");
    document.getElementById("batchEnd").removeAttribute("disabled");
    document.getElementById("batchEnd").setAttribute("type", "date");
    document.getElementById("edit").style.display = "none";
    document.getElementById("submit").style.display = "inline";
  }
}
