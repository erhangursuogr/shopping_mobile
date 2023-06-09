import { AfterContentChecked, Component } from '@angular/core';
import { LoadingController, ToastController, ViewDidEnter } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
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
export class ProductPage implements ViewDidEnter, AfterContentChecked {

  products: ProductModel[] = [];
  quantity = 1;
  isLoading = false;
  filterText = '';
  isAuth = false;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private authService: AuthService,
    private errorService: ErrorService,
    private toastrService: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  ionViewDidEnter(): void {
    this.getProducts();
  }

  //ngOnInit() { }

  async getProducts() {
    // this.isLoading = true;
    // this.showLoading();
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        // this.isLoading = false;
        // this.hideLoading();
      }, error: (err: any) => {this.hideLoading(); this.errorService.errorHandler(err)}
    });
  }

  addBasket(product: ProductModel) {
    // this.isLoading = true;
    // this.showLoading();
    const basketModel: BasketModel = new BasketModel();
    const quantity = document.getElementById('name-' + product.id)?.innerHTML;
    basketModel.productId = product.id;
    basketModel.quantity = Number(quantity);
    basketModel.product = product;
    basketModel.id = 0;
    this.basketService.addBasket(basketModel).subscribe({
      next: (res: any) => {
        this.presentToast('Product added to basket');
        // this.isLoading = false;
        // this.hideLoading();
        this.getProducts();
      }, error: (err: any) => {this.hideLoading(); this.errorService.errorHandler(err)}
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
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async showLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Loading...',
      //duration: 2000,
      spinner: 'circles',
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then();
        }
      });
    });
  }

  async hideLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then();
  }

}
