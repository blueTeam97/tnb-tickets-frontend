import { Component, OnInit, Input } from '@angular/core';
import { NgbModule, ModalDismissReasons, NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Play } from 'src/app/models/Play';
import { CustomValidationService } from '../../services/custom-validation.service'

@Component({
  selector: 'app-add-play',
  templateUrl: './add-play.component.html',
  styleUrls: ['./add-play.component.scss']
})
export class AddPlayComponent implements OnInit {

  @Input() openModal;

  addPlayForm: FormGroup;
  submitted = false;
  Play = {} as Play;


  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) { }


  ngOnInit(): void {
    this.buildForm();
  }


  public buildForm() {
    this.addPlayForm = this.fb.group({
      titlePlay: ['', [Validators.required,]],
      linkPlay: ['', Validators.compose([Validators.required, this.customValidator.patternValidator("URL")])],
      nrTickets: ['', Validators.compose([Validators.required, Validators.min(1)])],
      availableDate: ['', [Validators.required,]],
      availableHour: ['', [Validators.required,]],
      playDate: ['', [Validators.required,]],
      playHour: ['', [Validators.required,]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addPlayForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.addPlayForm.invalid) {
      return;
    }

    this.closeModal();

    this.createPlayObject();
  }

  createPlayObject() {

    this.Play.title = this.addPlayForm.get('titlePlay').value;
    this.Play.link = this.addPlayForm.get('linkPlay').value;
    this.Play.nrTickets = this.addPlayForm.get('nrTickets').value;
    this.Play.availableTimestamp = this.addPlayForm.get('availableDate').value.year + "-" +
      this.addPlayForm.get('availableDate').value.month + "-" + 
      this.addPlayForm.get('availableDate').value.day + " " +
      this.addPlayForm.get('availableHour').value.hour + ":" + 
      this.addPlayForm.get('availableHour').value.minute + ":" + 
      this.addPlayForm.get('availableHour').value.second;
    this.Play.playTimestamp = this.addPlayForm.get('playDate').value.year + "-" +
      this.addPlayForm.get('playDate').value.month + "-" + 
      this.addPlayForm.get('playDate').value.day + " " +
      this.addPlayForm.get('playHour').value.hour + ":" + 
      this.addPlayForm.get('playHour').value.minute + ":" + 
      this.addPlayForm.get('playHour').value.second;

      //call service
    console.log(this.Play);
  }

  closeModal() {
    this.activeModal.close();
  }

}
