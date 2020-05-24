import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Play } from 'src/app/models/Play';
import { Ticket } from 'src/app/models/Ticket';
import * as moment from 'moment';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: AdminService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  playId : number;
  play : Play;
  email : String;

  tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
  filteredTickets$: Observable<Ticket[]>;
  filter: FormControl;
  filter$: Observable<string>;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.playId = params['id'];
    });
    this.getPlayDetails();
    this.getTickets();
  }

  filterSearch() {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredTickets$ = combineLatest(this.tickets$, this.filter$).pipe(
      map(([tickets, filterString]) => tickets.filter(tickets =>
        tickets.userEmail.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)));
  }

  getTickets() {
    this.dataService.getBookedTickets(this.playId).subscribe((resp : any) => {
      this.tickets$.next(resp);
      console.log(this.tickets$);
      this.filterSearch();
    },
      (error) => {
        console.log(error);
      }
    )
  }

  getPlayDetails() {
    this.dataService.getPlayById(this.playId).subscribe((resp : Play) => {
      this.play = resp;
    })
  }

  pickUp(ticket : Ticket) {
    this.confirmationDialogService.confirm('Please confirm..', 'Are you sure to pickup this ticket?').then((confirmed) => {
      if (confirmed) {
        ticket.pickUpDate = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        ticket.bookDate = "";
        ticket.status = "pickedup";
        this.dataService.putTicketRequest(ticket).subscribe();
      }
    })
      .catch(() => console.log('User dismissed the dialog'));
  }
}

