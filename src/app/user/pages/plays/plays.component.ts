import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Play } from 'src/app/models/Play';

// interface Play {
//   name: string;
//   date: number;
//   tickets: number;
// }

// const PLAYS: Play[] = [
//   {
//     name: 'O noapte furtunoasa',
//     date: 2,
//     tickets: 17
//   },
//   {
//     name: 'Dineu cu prosti',
//     date: 2,
//     tickets: 7
//   }
// ];



@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
  providers: [DecimalPipe]
})

export class PlaysComponent implements OnInit {

  // //plays$: Observable<Play[]>;
  // //filter = new FormControl('');
  // searchText: string;
  // plays: Play[];

  plays$: Observable<Play[]>;
  filteredPlays$: Observable<Play[]>;
  filter: FormControl;
  filter$: Observable<string>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllPlays();
  }

  filterSearch() {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredPlays$ = combineLatest(this.plays$, this.filter$).pipe(
      map(([plays, filterString]) => plays.filter(play =>
        play.playName.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)));
  }

  getAllPlays() {
    this.plays$ = this.userService.getAllPlays();
    this.filterSearch();
  }


  // getAllPlays() {
  //   this.userService.getAllPlays().subscribe(
  //     (res) => {
  //       this.plays = res;
  //       console.log(res);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  

  // function search(text: string, pipe: PipeTransform): Play[] {
  //   return PLAYS.filter(play => {
  //     const term = text.toLowerCase();
  //     return play.name.toLowerCase().includes(term)
  //       || pipe.transform(play.date).includes(term);
  //   });
  // }
}
