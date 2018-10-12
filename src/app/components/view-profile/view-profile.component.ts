import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { Office } from '../../models/office.model';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  currentUser: User;
  constructor(private userService: UserControllerService) { }
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  address2: string;
  batchEnd: any;
  canEdit: boolean = false;
  officeObjectArray: Office[] = [];
  officeObject: Office;

  ngOnInit() {
    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.username = sessionStorage.getItem("userEmail");
    this.address2 = sessionStorage.getItem("address");
    this.batchEnd = new Date(sessionStorage.getItem("batchEnd")).toLocaleDateString();
    this.getOffices();
    this.getUsers();
    this.getRole();
  }

  edit() {
    document.getElementById("firstName").removeAttribute("disabled");
    document.getElementById("lastName").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");
    document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById("address").removeAttribute("disabled");
    document.getElementById("batchEnd").removeAttribute("disabled");
    document.getElementById("dayStart").removeAttribute("disabled");
    document.getElementById("batchEnd").setAttribute("type", "date");
    document.getElementById("currentOffice").style.display = "none";
    document.getElementById("selectOffice").style.display = "inline";
    document.getElementById("edit").style.display = "none";
    document.getElementById("submit").style.display = "inline";
    document.getElementById("errorMessage").removeAttribute("hidden");
  }

  submitChanges() {

    sessionStorage.setItem("firstName", this.firstName);
    sessionStorage.setItem("lastName", this.lastName);
    sessionStorage.setItem("userEmail", this.username);
    sessionStorage.setItem("address", this.address2);
    sessionStorage.setItem("batchEnd", this.batchEnd);
    sessionStorage.setItem("role", this.currentRole);
    this.userService.update().subscribe();
    window.location.reload(true);
  }

  switchRole() {
    if (sessionStorage.getItem("role") === "DRIVER") {
      sessionStorage.setItem("role", "RIDER");
      this.getRole();
    } else if (sessionStorage.getItem("role") === "RIDER") {
      sessionStorage.setItem("role", "DRIVER");
      this.getRole();
    } else {
      console.log("nope");
    }
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
    });
  }

  currentRole: string;
  getRole() {
    this.currentRole = sessionStorage.getItem("role");
  }

  users: any[];
  getUsers() {
    let data;
    this.userService.getAllUsers().subscribe((x) => { data = x; this.users = data });
  }
}
