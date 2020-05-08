import { Component, OnInit } from '@angular/core';
import { AddPlayComponent } from '../add-play/add-play.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openAddPlayModal(){
    this.modalService.open(AddPlayComponent);
  }

}
