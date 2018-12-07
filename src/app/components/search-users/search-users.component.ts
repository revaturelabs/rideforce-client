import { Component, OnInit } from '@angular/core';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  query: string = "";

  constructor() { }

  ngOnInit() {
  }

  public filterUsers(e) {
    console.log(e.target.value);
    console.log("query: ", this.query);
  }

}
