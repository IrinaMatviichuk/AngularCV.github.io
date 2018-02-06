import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(list: any, searchValue: string, searchCriteria: string): any {
    if (searchCriteria === 'date' && list.length !== 0) {
      return list.filter((i) => {
        const item = Object.assign({}, i);
        if (!isNaN(item[searchCriteria])) {
          item[searchCriteria] += '';
        }
        return item[searchCriteria] !== '';
      });
    }
    if (list.length === 0 || !searchValue) {
      return list;
    }
    return list.filter((i) => {
      const item = Object.assign({}, i);
      if (!isNaN(item[searchCriteria])) {
        item[searchCriteria] += '';
      }
      return item[searchCriteria].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });
  }
}
