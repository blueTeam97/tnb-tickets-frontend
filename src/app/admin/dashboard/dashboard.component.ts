import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddPlayComponent } from '../add-play/add-play.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Play } from 'src/app/models/Play';
import { Router } from '@angular/router';
import { faTrash, faEdit, faList, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: '[app-dashboard]',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() play: Play;
  @Input() filterValue: string;
  @Input() i: number;

  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() sendNotificationEvent: EventEmitter<any> = new EventEmitter();

  showSendNotification = false;

  faTrash = faTrash;
  faEdit = faEdit;
  faList = faList;
  faEnvelope = faEnvelope;

  constructor(public modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {

    this.showNotificationButton();

  }

  handleSendNotification() {
    this.sendNotificationEvent.emit(this.play.id);
  }


  showNotificationButton() {
    if (this.play.availableTicketsNumber > 0) {
      let today = moment();
      let availableDateMoment = moment(this.play.availableDate);
      if (moment(today).isAfter(availableDateMoment)) {
        this.showSendNotification = true;
      }
    }
  }

  handleDeleteButton() {
    this.deleteEvent.emit(this.play.id);
  }


  openEditModal() {
    const modalRef = this.modalService.open(AddPlayComponent);

    modalRef.componentInstance.play = this.play;

    modalRef.result.then((result) => {
      if (result)
        this.editEvent.emit(result);
    }).catch((err) => { })
  }

  handleViewTickets() {
    this.router.navigate(['admin/play/', this.play.id]);
  }

}
