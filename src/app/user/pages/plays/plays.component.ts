import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

interface Play {
  name: string;
  date: number;
  tickets: number;
}

const PLAYS: Play[] = [
  {
    name: 'O noapte furtunoasa',
    date: 2,
    tickets: 17
  },
  {
    name: 'Dineu cu prosti',
    date: 2,
    tickets: 7
  }
];

function search(text: string, pipe: PipeTransform): Play[] {
  return PLAYS.filter(play => {
    const term = text.toLowerCase();
    return play.name.toLowerCase().includes(term)
      || pipe.transform(play.date).includes(term);
  });
}

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss'],
  providers: [DecimalPipe]
})

export class PlaysComponent implements OnInit {

  plays$: Observable<Play[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.plays$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  ngOnInit(): void {
  }
}
