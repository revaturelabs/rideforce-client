import { Component, OnInit } from '@angular/core';
import { query } from '@angular/core/src/render3/query';
import { ViewProfileComponent } from '../view-profile/view-profile.component';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  query: string = "";

  constructor(private viewProfile: ViewProfileComponent) { }

  ngOnInit() {
  }

  public getQuery(e) {
    console.log("query: ", this.query);
    this.viewProfile.filterUsers(this.query);
  }

}
