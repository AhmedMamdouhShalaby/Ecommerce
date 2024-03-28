import { Product } from 'src/app/shared/service/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], term: string): Product[] {
    return products.filter((product) => product.title.toLowerCase().includes(term.toLowerCase()))
  }

}
