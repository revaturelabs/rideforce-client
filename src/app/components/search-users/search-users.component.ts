import { Component, OnInit } from '@angular/core';
import { query } from '@angular/core/src/render3/query';
import { ViewUsersComponent } from '../view-users/view-users.component';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  query: string = "";

  constructor(private viewUsers: ViewUsersComponent) { }

  ngOnInit() {
  }

  public getQuery(e) {
    console.log("query: ", this.query);
    this.viewUsers.filterUsers(this.query);
  }

}
