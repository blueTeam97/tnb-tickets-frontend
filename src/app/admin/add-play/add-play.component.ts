import { Component, OnInit, Input } from '@angular/core';
import { NgbModule , ModalDismissReasons, NgbDateStruct, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-play',
  templateUrl: './add-play.component.html',
  styleUrls: ['./add-play.component.scss']
})
export class AddPlayComponent implements OnInit {

  @Input() openModal;

  titlePlay: string;
  linkPlay: string;
  nrTickets: string;
  availableDate: NgbDateStruct;
  availableHour = {hour: 13, minute: 30, second: 0};
  playDate: NgbDateStruct;
  playHour = {hour: 13, minute: 30, second: 0};


  ngOnInit(): void {

  }

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(sendData: string) {
    console.log(this.nrTickets);
    this.activeModal.close(sendData);
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     console.log(content)
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
