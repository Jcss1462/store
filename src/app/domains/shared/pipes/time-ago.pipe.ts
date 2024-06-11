import { Pipe, PipeTransform } from '@angular/core';
import {formatDistance} from "date-fns"

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {

    let publishDate = new Date(value);
    let today= new Date();
   
    return  formatDistance(publishDate,today);
  }

}
