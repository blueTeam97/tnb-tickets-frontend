import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../services/admin.service';
import { Play } from '../models/Play';
import { AddPlayComponent } from './add-play/add-play.component';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  plays$: Observable<Play[]>;
  filteredPlays$: Observable<Play[]>;
  filter: FormControl;
  filter$: Observable<string>;

  constructor(public modalService: NgbModal,
    private dataService: AdminService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.getPlays();
  }

  filterSearch() {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredPlays$ = combineLatest(this.plays$, this.filter$).pipe(
      map(([plays, filterString]) => plays.filter(play =>
        play.playName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)));
  }

  getPlays() {
    this.plays$ = this.dataService.getPlaysRequest();
    this.filterSearch();
  }

  deletePlay(id: number) {
    this.confirmationDialogService.confirm(' ', 'Are you sure you want to delete this play?')
      .then((confirmed) => {
        if (confirmed) {
          this.dataService.deletePlayRequest(id).subscribe(() => {
            this.getPlays();
          })
        }
      })
      .catch((err) => { })
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

  sendNotification(id: number) {

    this.confirmationDialogService.confirm(' ', 'Are you sure you want to send email notifications?')
      .then((confirmed) => {
        if (confirmed) {
          this.toastr.warning("Sending emails..");
          this.dataService.sendPlayEmailNotification(id).subscribe(() => {
            this.toastr.success("Emails were sent successfully");
          },
            (error) => {
              this.toastr.warning("Failed to send");
            }
          );
        }
      })
      .catch((error) => { })

  }

}


