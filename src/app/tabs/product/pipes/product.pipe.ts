import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Pipe({
  name: 'productPipe'
})
export class ProductPipe implements PipeTransform {

  transform(value: ProductModel[], filterText: string): ProductModel[] {
    if (!filterText) {
      return value;
    } else
      try {
        return value.filter((p: any) => p.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1);
      } catch (error) {
        console.log(error);
        return value;
      }
  }

}
