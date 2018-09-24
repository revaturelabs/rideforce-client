import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @ViewChild('content')
  content: any;
  modal: NgbActiveModal;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(user: any): void {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-title' });
  }

}
