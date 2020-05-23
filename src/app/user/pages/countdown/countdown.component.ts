import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})

export class CountdownComponent implements OnInit {

  @Input() thenDate: moment.Moment;
  then: moment.Moment;
  now: moment.Moment;
  duration: moment.Duration;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  countdown: any;
  daysRadius: number;
  hoursRadius: number;
  minutesRadius: number;
  secondsRadius: number;
  endAngle: number

  constructor() { }

  ngOnInit(): void {
    this.createInterval();
  }

  setEndAngle(value: number) {
    if (value == 0) {
      this.endAngle = this.daysRadius;
    } else if (value == 1) {
      this.endAngle = this.hoursRadius;
    } else if (value == 2) {
      this.endAngle = this.minutesRadius;
    } else if (value == 3) {
      this.endAngle = this.secondsRadius;
    }
  }

  describeArc(x: number, y: number, radius: number, startAngle: number, value: number) {

    this.setEndAngle(value);

    let start = this.polarToCartesian(x, y, radius, this.endAngle);
    let end = this.polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = this.endAngle - startAngle <= 180 ? '0' : '1';

    let d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ].join(' ');

    return d;
  }

  polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  mapNumber(number: number, in_max: number, in_min: number, out_min: number, out_max: number) {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  createInterval() {
    this.countdown = setInterval(() => {
      this.then = this.thenDate;
      this.now = moment();
      this.duration = moment.duration(this.then.diff(this.now));

      this.days = this.duration.days();
      this.duration.subtract(moment.duration(this.days, 'days'));

      this.hours = this.duration.hours();
      this.duration.subtract(moment.duration(this.hours, 'hours'));

      this.minutes = this.duration.minutes();
      this.duration.subtract(moment.duration(this.minutes, 'minutes'));

      this.seconds = this.duration.seconds();

      this.positiveValues();

      this.daysRadius = this.mapNumber(this.days, 29, 0, 0, 360);
      this.hoursRadius = this.mapNumber(this.hours, 24, 0, 0, 360);
      this.minutesRadius = this.mapNumber(this.minutes, 60, 0, 0, 360);
      this.secondsRadius = this.mapNumber(this.seconds, 60, 0, 0, 360);

      if (!this.days && !this.hours && !this.minutes && !this.seconds) {
        clearInterval(this.countdown);
      }

    }, 1000);
  }

  positiveValues() {
    if (this.days < 0) {
      this.days = this.days * -1;
    }
    if (this.hours < 0) {
      this.hours = this.hours * -1;
    }
    if (this.minutes < 0) {
      this.minutes = this.minutes * -1;
    }
    if (this.seconds < 0) {
      this.seconds = this.seconds * -1;
    }
  }

  ngOnDestroy() {
    clearInterval(this.countdown);
  }

}
