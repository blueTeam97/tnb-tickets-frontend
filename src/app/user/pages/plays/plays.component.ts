import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, startWith, last } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Play } from 'src/app/models/Play';
import BookResponse from 'src/app/models/BookResponse';
import UserPlaysPopulator from 'src/app/models/UserPlaysPopulator';
import { Ticket } from 'src/app/models/Ticket';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
  providers: [DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})

export class PlaysComponent implements OnInit {

  userPopulator: UserPlaysPopulator;
  filteredPlays$: Observable<Play[]>;
  filter: FormControl;
  filter$: Observable<string>;
  lastBookedTicket:Ticket;
  ticketDiffInDays:number;
  nothingToShow:boolean=false;
  bookedAvailablePlays:Play[]=[];
  customDate = {
    day: '',
    year: '',
    dayNumber: '',
    month: '',
  }

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  href : string;
  modalPlayLink : string = '';

  bookResponse:BookResponse = {
    expiredTime:0,
    allowedToBook:false
  };

  constructor(private userService: UserService,
    private confirmBookModal: ConfirmationDialogService,private modalService: NgbModal,private toastr:ToastrService) {
}

  ngOnInit(): void {
    this.getAllPlays();
  }
  playIsAvailableToBook(playDateString:string):boolean{
    return new Date(playDateString).getTime()<=new Date().getTime();
  }
  comparePlayDateToCurrentDate(playDateString:string):boolean{
      return new Date().getTime() <= new Date(playDateString).getTime();
  }
  comparePlayAvailableDateToUserTicket(playIsAvailableDateString:string):boolean{
      if(!this.userPopulator.userLastBookedTicket)
        return true;
      let diffInDays=Math.floor(Math.abs((new Date(this.userPopulator.userLastBookedTicket.bookDate).getTime()- new Date().getTime())/86400000));
      return diffInDays>=30;
  }
  getAllPlays() {
    this.userService.getAllPlays().subscribe((res)=>{
      console.log(res,res.bookedAvailablePlays);
      this.userPopulator=res;
      if(this.userPopulator.userEdiblePlays.length==0){
        this.nothingToShow=true;
      }
      else{
        if(this.userPopulator.userLastBookedTicket){
          this.ticketDiffInDays=Math.floor(Math.abs((new Date(this.userPopulator.userLastBookedTicket.bookDate).getTime()-new Date().getTime())/86400000));
        }
      }
    });
  }

  // getAllPlays(){
  //   this.userService.getAllPlays().subscribe((res)=> {
  //     this.plays=res.userEdiblePlays;
  //     console.log(this.plays);
  //   });
  // }
  unbookClickHandler(playId:number){
    this.confirmBookModal.confirm("Atention!","Are you sure you want to unbook this ticket?")
                         .then(modalRes=>{
                            if(modalRes){
                              this.userService.unbookTicket(playId).subscribe((unbookRes)=>{
                                if(unbookRes){
                                  this.toastr.success("Your ticket was unbooked successfully","");
                                  this.getAllPlays();
                                }
                              });
                            }
                         })
  }
  bookClickHandler(playId:number){
    console.log(this.bookResponse);
    this.confirmBookModal.confirm("Confirmation dialog","Are you sure you want to book this play?")
                      .then(res=>{
                        if(res){
                          this.bookTicket(playId).subscribe((res:BookResponse)=>{
                            this.bookResponse=res;
                            if(this.bookResponse.allowedToBook){
                              this.toastr.success("Done!","Your ticket was booked!");
                              this.getAllPlays();
                            }
                            else if(!this.bookResponse.allowedToBook){
                              this.confirmBookModal.confirm("Too slow!","Bad Luck!The last ticket was booked "+this.bookResponse.expiredTime.toString()+"s ago");
                            }
                            else console.log("Booking cancelled!");
                          });
                        }
                      });
  }
  bookTicket(playId:number){
    return this.userService.bookTicket(playId);
  }
  openModal(content,play:Play) {
    let qrContent = play.playName + '\n' + play.playDate + '\n' + play.link;
    this.value = qrContent;
    this.modalPlayLink = play.link;
    this.display = true;
    this.modalService.open(content, { size: 'sm' });
  }

  test(playDate:string) {
    let dateArray = playDate.split(',');
    this.customDate.day = dateArray[0];
    let date = dateArray[1];
    let splitDate = date.split(" ");
    this.customDate.year = dateArray[2];
    this.customDate.dayNumber = splitDate[2];
    this.customDate.month = splitDate[1]; 
  }
}
