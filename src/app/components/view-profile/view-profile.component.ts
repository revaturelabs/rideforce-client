import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
//import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Role } from '../../models/role.model';
import { Office } from '../../models/office.model';
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
  password : string;
  confirmPassword : string;
  address2 : string;
  batchEnd : any;
  canEdit : boolean = false;
  officeObjectArray: Office[] = [];
  officeObject: Office;
  
  ngOnInit() {
    this.userService.getCurrentUserObservable().subscribe(
      data => {
        this.currentUser = data;
        console.log(this.currentUser);
        this.firstName = this.currentUser.firstName;
        this.lastName = this.currentUser.lastName;
        this.username = this.currentUser.email;
        // console.log(this.userService.getOfficeByLink(this.currentUser.office).subscribe().toString());
        // document.getElementById("currentOffice").textContent = this.userService.getOfficeByLink(this.currentUser.office).toString();
        this.address2 = this.currentUser.address;
        this.batchEnd = new Date(this.currentUser.batchEnd).toLocaleDateString();
      }
    );
    this.getOffices();
    this.getUsers();
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
    document.getElementById("currentOffice").style.display = "none";
    document.getElementById("selectOffice").style.display = "inline";
    document.getElementById("edit").style.display = "none";
    document.getElementById("submit").style.display = "inline";
    document.getElementById("errorMessage").removeAttribute("hidden");
  }

  submitChanges() {
    this.currentUser.firstName = this.firstName;
    this.currentUser.lastName = this.lastName;
    this.currentUser.email = this.username;
    this.currentUser.office = "/offices/1";
    this.currentUser.address = this.address2;
    this.currentUser.batchEnd = new Date(this.batchEnd);

    // if(this.password !== "") {
    //   if(this.password === this.confirmPassword) {
        
    //   }
    // }
    this.userService.update(this.currentUser).subscribe(data => {this.currentUser = data});
    this.userService.updatePassword(this.currentUser.id, "p4ssw0rd", this.password).subscribe();
    window.location.reload;
  }

  switchRole() {
    if(this.currentUser.role === "DRIVER") {
      this.currentUser.role = Role.Rider;
    } else if(this.currentUser.role === "RIDER") {
      this.currentUser.role = Role.Driver;
    } else {
      console.log("nope");
    }
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
    });
  }

  users: any[];
  getUsers(){
    let data;
    // this.postService.getPosts().then((allPosts) => {posts = allPosts; console.log(posts.results[0].id)});
    this.userService.getAllUsers().subscribe((x) => {data = x; this.users = data});
  }
}
