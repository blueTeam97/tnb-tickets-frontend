import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Ticket } from 'src/app/models/Ticket';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
  filteredTickets$: Observable<Ticket[]>;
  filter: FormControl;
  filter$: Observable<string>;

  date: string;
  hasHistory :boolean = true;

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getAllTicketsByUserId(this.tokenService.getUserId());
  }

  filterSearch() {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredTickets$ = combineLatest(this.tickets$, this.filter$).pipe(
      map(([tickets, filterString]) => tickets.filter(ticket =>
        ticket.playDTO.playDate.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 || 
        ticket.playDTO.playName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        )));
  }

  getAllTicketsByUserId(userId:number) {
    this.userService.getAllTicketsByUserId(userId)
      .subscribe((res) => {
        this.tickets$.next(res);
        if(res.length === 0){
          this.hasHistory = false;
        }  
        //console.log(res.length);
      },
        (error) => {
          //console.log(error);
        });
    this.filterSearch();
  }

}
