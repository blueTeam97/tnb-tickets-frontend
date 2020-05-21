import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Play } from 'src/app/models/Play';
import { Ticket } from 'src/app/models/Ticket';
import * as moment from 'moment';


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: AdminService
  ) { }

  tickets : Ticket[];
  playId : number;
  play : Play;
  email : String;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.playId = params['id'];
    });
    this.getPlayDetails();
    this.getTickets();
   
  }

  getPlayDetails() {
    this.dataService.getPlayById(this.playId).subscribe((resp : Play) => {
      this.play = resp;
      console.log(this.play);
    })
  }

  getTickets() {
    this.dataService.getBookedTickets(this.playId).subscribe((resp : any) => {
      this.tickets = resp;
    })
  }

  pickUp(ticket : Ticket) {
     ticket.pickUpDate = moment().format('YYYY-MM-DD HH:mm:ss').toString();
     ticket.bookDate = "";
     ticket.status = "pickedup";
     this.dataService.putTicketRequest(ticket).subscribe();
  }


}
