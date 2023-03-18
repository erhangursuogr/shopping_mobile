import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ViewDidEnter } from '@ionic/angular';
import { BasketModel } from '../models/basket-model';
import { BasketService } from '../services/basket.service';
import { PaymentModel } from './models/payment-model';
import { SendPaymentModel } from './models/send-payment-model';
import { PaymentService } from './services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements ViewDidEnter {

  basketModel: BasketModel[] = [];
  paymentModel: PaymentModel = new PaymentModel();
  sendPaymentModel: SendPaymentModel = new SendPaymentModel();
  total: number = 0;

  constructor(
    private basketService: BasketService,
    private paymentService: PaymentService,
    private toastrService: ToastController,
    private router: Router
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

  addPayment(form: any) {
    this.paymentModel.id = 0;
    this.paymentModel.cardNumber = form.value.cardNumber;
    this.paymentModel.cardOwner = form.value.cardOwner;
    this.paymentModel.cvv = form.value.cvv;
    this.paymentModel.expirationDate = form.value.expirationDate;
    this.paymentModel.date = new Date();
    this.sendPaymentModel.payment = this.paymentModel;
    this.sendPaymentModel.baskets = this.basketModel;

    this.paymentService.addPayment(this.sendPaymentModel).subscribe({
      next: (res: any) => {
        this.presentToast('Payment success');
        this.router.navigate(['/tabs/basket']);
        this.getBasket();
      }, error: (err: any) => console.log(err)
    });
  }

  async presentToast(_msg: string) {
    const toast = await this.toastrService.create({
      message: _msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
