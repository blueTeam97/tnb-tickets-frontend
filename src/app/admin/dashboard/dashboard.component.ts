import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddPlayComponent } from '../add-play/add-play.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Play } from 'src/app/models/Play';


@Component({
  selector: '[app-dashboard]',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() play: Play;

  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() editEvent: EventEmitter<any> = new EventEmitter();

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
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

}
