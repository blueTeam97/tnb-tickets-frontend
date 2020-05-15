import { Pipe, PipeTransform } from '@angular/core';
import { Play } from 'src/app/models/Play';

@Pipe({
  name: 'playsFilter'
})
export class PlaysFilterPipe implements PipeTransform {

  transform(plays: Play[], text:string): any {
    if(text == null || text ==='')
      return plays;
    return plays.filter(e => e.playName.toLowerCase().includes(text.toLowerCase()) || e.playDate.includes(text) || e.availableDate.includes(text))
  }

}
