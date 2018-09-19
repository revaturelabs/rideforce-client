import { Component, OnInit } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    NgbTabset
  ]
})
export class RegisterComponent implements OnInit {

  @ViewChild(NgbTabset)
  private tabset: NgbTabset;

  constructor() { }

  ngOnInit() {
  }

}
