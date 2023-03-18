import { Component } from '@angular/core';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { BasketModel } from './models/basket-model';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: 'basket.page.html',
  styleUrls: ['basket.page.scss']
})
export class BasketPage implements ViewDidEnter {

  basketModel: BasketModel[] = [];
  total = 0;
  subTotal = 0;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private basketService: BasketService,
    private alertController: AlertController
  ) { }

  ionViewDidEnter(): void {
    this.getBasketTotal();
  }

  //ngOnInit() { }

  getBasket() {
    return this.basketService.getBasket();
  }

  getBasketTotal() {
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
      }, error: (err: any) => console.log(err)
    });
  }

  deleteBasket(basketModel : BasketModel) {
    this.basketService.deleteBasket(basketModel).subscribe({
      next: (res: any) => {
        this.getBasketTotal();
      }, error: (err: any) => console.log(err)
    });
  }


  async presentAlert(basketModel : BasketModel) {
    const alert = await this.alertController.create({
      header: 'Product Deleted',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Confirm Canceled';
          },
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
//            console.log(basketModel);
            this.deleteBasket(basketModel);
            //this.handlerMessage = 'Confirm Okay';
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

}
