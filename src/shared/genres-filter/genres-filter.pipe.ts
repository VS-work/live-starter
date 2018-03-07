import { Pipe, PipeTransform } from '@angular/core';

import filter from 'lodash-es/filter';

export interface Country {
  _id: string;
  genre: any;
}

@Pipe({
  name: 'GenresFilterPipe'
})

export class GenresFilterPipe implements PipeTransform {
  public transform(...args: any[]): any {
    let [value, text] = args;

    if (!text) {
      return value;
    }

    return filter(value, (item: Country) => {
      return item.genre.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
  }
}
