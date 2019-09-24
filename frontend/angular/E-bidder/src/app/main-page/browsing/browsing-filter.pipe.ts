import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'BrowsingFilter',
  pure: false
})
export class BrowsingFilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (filter.maxprice == null) {
      return items.filter(item => (item.seller.city.toLocaleLowerCase().indexOf(filter.city.toLocaleLowerCase()) !== -1)
        && (item.seller.country.toLocaleLowerCase().indexOf(filter.country.toLocaleLowerCase()) !== -1)
        && (item.currentBid > filter.minprice));
    }else{
      return items.filter(item => (item.seller.city.toLocaleLowerCase().indexOf(filter.city.toLocaleLowerCase()) !== -1)
        && (item.seller.country.toLocaleLowerCase().indexOf(filter.country.toLocaleLowerCase()) !== -1)
        && (item.currentBid >= filter.minprice)
        && (item.currentBid <= filter.maxprice));
    }
  }
}
