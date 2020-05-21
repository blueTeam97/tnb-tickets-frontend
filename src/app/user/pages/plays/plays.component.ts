import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
  providers: [DecimalPipe]
})

export class PlaysComponent implements OnInit {

  userPopulator$: BehaviorSubject<UserPlaysPopulator> = new BehaviorSubject<UserPlaysPopulator>({userEdiblePlays:[],userLastBookedTicket:null});
  filteredPlays$: Observable<Play[]>;
  filter: FormControl;
  filter$: Observable<string>;
  lastBookedTicket:Ticket;
  ticketDiffInDays:number;
  nothingToShow:boolean=false;

  bookResponse:BookResponse = {
    expiredTime:0,
    allowedToBook:false
  };
  
  constructor(private userService: UserService,
              private confirmBookModal: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.getAllPlays();
  }

  filterSearch() {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredPlays$ = combineLatest(this.userPopulator$, this.filter$).pipe(
      map(([populator, filterString]) =>populator.userEdiblePlays.filter(play =>
        play.playName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)));
  }
  playIsAvailableToBook(playDateString:string):boolean{
    return new Date(playDateString).getTime()<=new Date().getTime();
  }
  comparePlayDateToCurrentDate(playDateString:string):boolean{
      return new Date().getTime() <= new Date(playDateString).getTime();
  }
  comparePlayAvailableDateToUserTicket(playIsAvailableDateString:string):boolean{
      if(this.lastBookedTicket===null)
        return true;
      let diffInDays=Math.floor(Math.abs((new Date(this.lastBookedTicket.bookDate).getTime()- new Date(playIsAvailableDateString).getTime())/86400000));
      return diffInDays>=30;
  }
  getAllPlays() {
    this.userService.getAllPlays().subscribe((res)=>{
      console.log(res);
      if(res.userEdiblePlays===null || res.userEdiblePlays===[]){
        this.nothingToShow=true;
      }
      else{
        this.userPopulator$.next(res);
        this.lastBookedTicket = res.userLastBookedTicket;
        if(this.lastBookedTicket!==null){
          this.ticketDiffInDays=Math.floor(Math.abs((new Date(this.lastBookedTicket.bookDate).getTime()-new Date().getTime())/86400000));
        }
        console.log(this.ticketDiffInDays);
      }
    });
    this.filterSearch();
  }
  bookClickHandler(playId:number){
    console.log(this.bookResponse);
    this.confirmBookModal.confirm("Confirmation dialog","Are you sure you want to book this play?")
                      .then(res=>{
                        if(res){
                          this.bookTicket(playId).subscribe((res:BookResponse)=>{
                            this.bookResponse=res;
                            if(this.bookResponse.allowedToBook){
                              this.confirmBookModal.confirm("Done!","Your ticket was booked!").then((res)=>{this.getAllPlays();});
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
}
