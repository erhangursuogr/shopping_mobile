import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { SendPaymentModel } from '../models/send-payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient,
  ) { }

  addPayment(payment: SendPaymentModel): Observable<any> {
    console.log(payment);
    return of(this.http.post(this.apiUrl + 'Orders/addPayment', payment).pipe(catchError(this.handleError)));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
