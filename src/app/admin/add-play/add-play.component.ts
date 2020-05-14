import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModule, ModalDismissReasons, NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Play } from 'src/app/models/Play';
import { CustomValidationService } from '../../services/custom-validation.service'
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-play',
  templateUrl: './add-play.component.html',
  styleUrls: ['./add-play.component.scss'],
})
export class AddPlayComponent implements OnInit {
  @Input() openModal;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  addPlayForm: FormGroup;
  submitted = false;
  play = {} as Play;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit(): void {

    if (this.play.id == null) {
      this.buildForm();
    }
    else {
      this.buildEditForm();
    }
  }

  public buildForm() {

    //assign 0 to set the error message of the ticket number
    this.play.ticketsNumber = 0;
    this.addPlayForm = this.fb.group({
      titlePlay: ['', [Validators.required]],
      linkPlay: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator('URL'),
        ]),
      ],
      nrTickets: [
        '',
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      availableDate: ['', [Validators.required]],
      availableHour: ['', [Validators.required]],
      playDate: ['', [Validators.required]],
      playHour: ['', [Validators.required]],
    });
  }

  splitStringToDate(fullDate: string) {
    let dateString = fullDate.split(" ")[0];
    let dateStringArray = dateString.split("-");
    let date = {
      "year": parseInt(dateStringArray[0]),
      "month": parseInt(dateStringArray[1]),
      "day": parseInt(dateStringArray[2])
    }
    return date;
  }

  splitStringToTime(fullDate: string) {
    let timeString = fullDate.split(" ")[1];
    let timeStringArray = timeString.split(":");
    let time = {
      "hour": parseInt(timeStringArray[0]),
      "minute": parseInt(timeStringArray[1]),
      "second": parseInt(timeStringArray[2])
    }
    return time;
  }


  private buildEditForm() {

    this.addPlayForm = this.fb.group({
      titlePlay: [this.play.playName, [Validators.required,]],
      linkPlay: [this.play.link, Validators.compose([Validators.required, this.customValidator.patternValidator("URL")])],
      nrTickets: [this.play.ticketsNumber, Validators.compose([Validators.required, Validators.min(this.play.ticketsNumber)])],
      availableDate: [this.splitStringToDate(this.play.availableDate), [Validators.required,]],
      availableHour: [this.splitStringToTime(this.play.availableDate), [Validators.required,]],
      playDate: [this.splitStringToDate(this.play.playDate), [Validators.required,]],
      playHour: [this.splitStringToTime(this.play.playDate), [Validators.required,]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addPlayForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addPlayForm.invalid) {
      return;
    }

    this.createPlayObject();
    this.passPlayObject();
  }

  formatDate(date: any): string {
    return [
      date.year,
      (date.month < 10 ? ('0' + date.month) : date.month),
      (date.day < 10 ? ('0' + date.day) : date.day)
    ].join('-');
  }


  createPlayObject() {

    this.play.playName = this.addPlayForm.get('titlePlay').value;
    this.play.link = this.addPlayForm.get('linkPlay').value;
    this.play.ticketsNumber = this.addPlayForm.get('nrTickets').value;

    this.play.availableDate = this.formatDate(this.addPlayForm.get('availableDate').value) + " " +
      this.addPlayForm.get('availableHour').value.hour + ":" +
      this.addPlayForm.get('availableHour').value.minute + ":00";

    this.play.playDate = this.formatDate(this.addPlayForm.get('playDate').value) + " " +
      this.addPlayForm.get('playHour').value.hour + ":" +
      this.addPlayForm.get('playHour').value.minute + ":00";

  }

  passPlayObject() {
    this.activeModal.close(this.play);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
