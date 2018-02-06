import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(data: any, params: string, criteria?: string): any {
    if (!data) {
      return data;
    }
    if (params !== 'date') {
      return data.sort((first, second) => {
        if (first[params] > second[params]) {
          return 1;
        } else if (first[params] < second[params]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      return data.sort((first, second) => {
        if (moment(first[params], 'YYYY-MM-DD HH:mm:ss') < moment(second[params], 'YYYY-MM-DD HH:mm:ss')) {
          return 1;
        } else if (moment(first[params], 'YYYY-MM-DD HH:mm:ss') > moment(second[params], 'YYYY-MM-DD HH:mm:ss')) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }
}
