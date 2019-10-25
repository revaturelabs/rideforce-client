import { Router } from '@angular/router';
import { ViewChild, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { KJUR, KEYUTIL, RSAKey } from 'jsrsasign';
import { HttpClient } from '@angular/common/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { Location } from '../../models/location';
import { UserService } from '../../services/user.service';


/**
 * Used for new user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [NgbTabset]
})
export class RegisterComponent implements OnInit {
  //this saves the user info that is typed in
  user: User;
  zipNum : number;  //the zip code as a number (will be casted to string)
  //this saves the location info that is typed in
  loc: Location = {
    lid : 0,
    address : null,
    city : null,
    state : null,
    zip : "",
    longitude : null,
    latitude : null
  }

  /** Password Confirmation Model */
  passwordConfirm: string;
  /** Tabset Object */
  @ViewChild(NgbTabset) private tabset: NgbTabset;


  /**
   * Import services.
   * @param userService contains various user services.
   */
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private zone: NgZone,
    private userService: UserService

    ) {}

  /**
   * Initialize variables.
   */
  ngOnInit() {
    this.user = new User();
    this.passwordConfirm = "";
    // this.http.get<{ keys: { kid: string }[] }>(environment.userUrl + '/.well-known/jwks.json')
    //   .subscribe(d => d.keys.forEach(k => this.jwks.set(k.kid, KEYUTIL.getKey(k))));
  }

  validateEmail() {
    // for (let i = 0; i < this.user.email.length; i++) {
    //   if (this.user.email[i] === '@') {
        // return (this.user.email.substr(i, this.user.email.length-i) === "revature.com");
    //   }
    // }
    return (this.user.email === "^[a-zA-Z0-9_.+!%#$&'*?^{|}`~-]+@?(revature)\.com$");
  }


  getRoleId(roleIn : string) {
    if (roleIn == "Driver") {
      return 1;
    }
    else if (roleIn == "Rider") {
      return 2;
    }
  }

  /**
   * Sets the users role(s).
   */
  setRole(roleIn : string) {
    //if no role has been selected
    if (this.user.roles == undefined) {
      this.user.roles = [];      
      this.user.roles.push({id: this.getRoleId(roleIn), rname: roleIn});  //roleIn will either be 'rider' or 'driver'
    }
    else {
      let index = null; //if the user has already selected a role, this index will represent where it is in the 'roles' array
      for (let i in this.user.roles) {
        if (this.user.roles[i].rname === roleIn) {
          index = i;
        }
      }
      if (index != null) {  //if the user has deselected a role
        this.user.roles.splice(index, 1); //remove the role from the roles array
      }
      else {  //the user has selected a second role
        this.user.roles.push({id: this.getRoleId(roleIn), rname: roleIn});
      }
    }
  }

  //this colors the 'rider' and 'driver' buttons if they are selected
  colorButtons(roleIn : string) {
    if (this.user.roles != undefined) {
      for (let i in this.user.roles) {
        if (this.user.roles[i].rname == roleIn) {
          return "lightblue";
        }
      }
    }
    return "white";
  }

  getRoles() {
    if (this.user.roles == undefined || this.user.roles.length == 0) {
      return "";
    }
    else if (this.user.roles.length == 1) {
      if (this.user.roles[0].rname === 'Rider') {
        return "Rider";
      }
      else if (this.user.roles[0].rname === 'Driver') {
        return "Driver";
      }
    }
    else if (this.user.roles.length == 2) {
      return "Rider, Driver";
    }
  }
  


  /**
   * Changes from the current tab to the desired one.
   * @param newTab the tab to change to.
   */
  changeTab(newTab: string) {
    // Enable the next tab
    this.tabset.tabs.find(t => t.id === newTab).disabled = false;
    // Disable the previous tab
    this.tabset.tabs.find(t => t.id === this.tabset.activeId).disabled = true;
    // Switch to the new tab
    this.tabset.select(newTab);
  }

 //Register new user with Cognito in server-side application. 
  register() {
    this.user.uid = 0;
    this.loc.zip = this.zipNum + "";
    this.user.location = this.loc;
    this.user.isActive = true;
    console.log(this.user);
    console.log(JSON.stringify(this.user));
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log(response);
        let validUser :User = response;
        localStorage.setItem('currentUser', JSON.stringify(validUser));

      },
      (response) => {
        console.log(response);
      }
    );
    // this.userService.createUser(this.user).subscribe(data => {
    //   alert(data);
    //   console.log(this.user);
    //   this.router.navigate(['/landing']);
    // }, error => {
    //     alert("There was an error during registration.");
    //   }
    // );
  }

}


//Testing branch comment