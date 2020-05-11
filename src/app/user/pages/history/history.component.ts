import { Component, OnInit } from '@angular/core';

interface Ticket {
  name: string;
  date: number;
}


const TICKETS: Ticket[] = [
  {
    name: 'O noapte furtunoasa',
    date:  13
  },
  {
    name: 'Straini in noapte',
    date: 3
  },
  {
    name: 'Dineu cu prosti',
    date:3
  }
];


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  tickets = TICKETS;

  constructor() { }

  ngOnInit(): void {
  }

}
