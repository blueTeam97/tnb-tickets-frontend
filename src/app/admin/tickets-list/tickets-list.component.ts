import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Play } from 'src/app/models/Play';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: AdminService
  ) { }

  tickets: Ticket[];
  playId: number;
  play : Play;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.playId = params['id'];
    });
    this.getTickets();
  }

  getTickets() {
    this.dataService.getTicketsbyPlayIdRequest(this.playId).subscribe((resp : any) => {
      this.tickets = resp;
      this.play = this.tickets.find(o => o.id == this.playId).playDTO;
      console.log(this.play);
    })
  }


}
