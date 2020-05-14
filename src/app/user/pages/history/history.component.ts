import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Play } from 'src/app/models/Play';
import { LiteralExpr } from '@angular/compiler';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { Ticket } from 'src/app/models/Ticket';

// interface Ticket {
//   name: string;
//   date: number;
// }

// const TICKETS: Ticket[] = [
//   {
//     name: 'O noapte furtunoasa',
//     date: 13,
//   },
//   {
//     name: 'Straini in noapte',
//     date: 3,
//   },
//   {
//     name: 'Dineu cu prosti',
//     date: 3,
//   },
// ];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  //tickets = TICKETS;
  userId: number;
  tickets: Ticket[];
  plays: Play[];

  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getAllTickets();
    //this.getAll();
  }

  getAllTickets() {
    this.userId = this.tokenService.getUserId();
    this.userService.getAllTicketsByUserId(this.userId).subscribe(
      (res) => {
        this.tickets = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // getAll() {
  //   this.userService.getAllPlays().subscribe(
  //     res => {
  //             this.plays = res;
  //             console.log(res)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
