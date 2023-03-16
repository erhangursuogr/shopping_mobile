import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ErrorService } from '../../services/error.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient    
  ) { }

  getBasket() {
    return this.httpClient.get(this.apiUrl + 'baskets/getlist');
  }

  addBasket(product: any) {
    return this.httpClient.post(this.apiUrl + 'baskets/add', product);
  }

}
