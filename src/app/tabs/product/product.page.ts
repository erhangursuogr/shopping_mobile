import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BasketModel } from '../basket/models/basket-model';
import { BasketService } from '../basket/services/basket.service';
import { ErrorService } from '../services/error.service';
import { ProductModel } from './models/product-model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss']
})
export class ProductPage {

  products: ProductModel[] = [];
  quantity = 1;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private errorService: ErrorService,
    private toastrService: ToastController
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;        
      }, error: (err: any) => this.errorService.errorHandler(err) 
    });
  }

  addBasket(product: ProductModel) {
    const basketModel: BasketModel = new BasketModel();
    const quantity = document.getElementById('name-' + product.id)?.innerHTML;
    basketModel.productId = product.id;
    basketModel.quantity = Number(quantity);
    basketModel.product = product;
    basketModel.id = 0;
    this.basketService.addBasket(basketModel).subscribe({
      next: (res: any) => {
        this.presentToast('Product added to basket');
      }, error: (err: any) => this.errorService.errorHandler(err)
    });
  }

  addQuantity(product: ProductModel) {
    const quantity = document.getElementById('name-' + product.id)?.innerHTML;
    //const quantity = output?.innerHTML;

    if ((Number(quantity) + 1) > Number(product.inventoryQuantity) ) {
      this.presentToast('Quantity is not enough');
      return;
    }else {
      this.quantity++;
      //document.getElementById('name-' + product.id)?.innerHTML = this.quantity.toString();
    }
  }

  removeQuantity(product: ProductModel) {
    if (this.quantity - 1 < 1) {
      this.presentToast('Quantity is not enough');
      return;
    }else {
      this.quantity--;
    }    
  }

  async presentToast(_msg: string) {
    const toast = await this.toastrService.create({
      message: _msg,
      duration: 2000
    });
    toast.present();
  }

}
