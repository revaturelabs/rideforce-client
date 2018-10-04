import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  registrationKey: string;

  constructor(private userService: UserControllerService) { }

  ngOnInit() {
  }

  getRegistrationKey(){
    this.userService.getRegistrationKey().subscribe(
      data => {
        this.registrationKey = data;
      }
    )
  }

  dateLocationEncryption(){
    
  }

}
