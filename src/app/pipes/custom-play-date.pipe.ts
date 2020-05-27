import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPlayDate'
})
export class CustomPlayDatePipe implements PipeTransform {

  transform(date:string): string {
    let customDate = date.split(" ");
   // console.log("wwwwwwwwwwwwwwwwwwww")
    return `${customDate[0]}
    ${customDate[1]}`;
  }

}
