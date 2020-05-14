import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../services/admin.service';
import { Play } from '../models/Play';
import { AddPlayComponent } from './add-play/add-play.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  plays: Play[];

  constructor(public modalService: NgbModal,
    private dataService: AdminService
  ) { }


  ngOnInit(): void {
    this.getPlays();
  }

  getPlays() {
    this.dataService.getPlaysRequest().subscribe((res: Play[]) => {
      this.plays = res;
    })
  }

  deletePlay(id: string) {
    this.dataService.deletePlayRequest(id).subscribe(() => {
      this.getPlays();
    });
  }

  postPlay(play: Play) {
    this.dataService.postPlayRequest(play).subscribe(() => {
      this.getPlays();
    })
  }

  openAddPlayModal() {
    const modalRef = this.modalService.open(AddPlayComponent);

    modalRef.result.then((result) => {
      if (result)
        this.postPlay(result);
    }).catch((err) => { })
  }

  editPlay(play: Play) {
    this.dataService.editPlayRequest(play).subscribe(() => {
      this.getPlays();
    })
  }

}


