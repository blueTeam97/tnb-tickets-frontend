import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Play } from 'src/app/models/Play';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
  providers: [DecimalPipe]
})

export class PlaysComponent implements OnInit {

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

}
