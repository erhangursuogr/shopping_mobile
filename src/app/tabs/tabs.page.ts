import { Component } from '@angular/core';
import { BasketService } from './basket/services/basket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  total = 0;

  constructor(
    private basketService: BasketService,
  ) {}

  ngOnInit() {
    this.getBasketTotal();
  }

  getBasketTotal() {
    this.basketService.getBasket().subscribe({
      next: (res: any) => {
        this.total = 0;
        //console.log(res.data);
        res.data.forEach((item: any) => {
          this.total += item.product.price * item.quantity;
        });
      }, error: (err: any) => console.log(err)
    });
  }

}
