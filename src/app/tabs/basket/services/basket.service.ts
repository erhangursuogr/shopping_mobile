import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ErrorService } from '../../services/error.service';
import { BasketModel } from '../models/basket-model';

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

  deleteBasket(basketModel: BasketModel|any): Observable<any>{
    console.log(basketModel);
    return of(this.httpClient.delete(this.apiUrl + 'baskets/delete', basketModel).pipe(catchError(this.handleError)));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
