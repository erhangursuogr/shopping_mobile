import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { BasketModel } from '../models/basket-model';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements ViewDidEnter {

  basketModel: BasketModel[] = [];
  total: number = 0;

  constructor(
    private basketService: BasketService,
  ) { }
 
  ionViewDidEnter(): void {    
    this.getBasket();
  }

  getBasket() {
    this.basketService.getBasket().subscribe({
      next: (res: any) => {
        this.total = 0;
        if (res.data.length === 0) {
          return;
        } else {
          this.basketModel = res.data;
          res.data.forEach((item: any) => {
            this.total += item.product.price * item.quantity;
          });
        }
      }
    });
  }

  payment(form: any) {
    console.log(form.value);
    // this.basketService.payment().subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //   }, error: (err: any) => console.log(err)
    // });
  }

}
