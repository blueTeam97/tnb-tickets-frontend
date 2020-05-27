import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(value: string): string {
    return this.datePipe.transform(value,'MMM-d-yyyy HH:mm');;
  }

}
