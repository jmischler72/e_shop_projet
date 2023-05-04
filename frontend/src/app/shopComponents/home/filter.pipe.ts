import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items) return [];
    if (!filter) return items;
    filter = filter.toLowerCase();
    return items.filter(it => {
      return it.product.name.toLowerCase().includes(filter);
    });
  }

}
