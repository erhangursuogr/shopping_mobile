import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) { }

  getProducts() {    
    return this.httpClient.get(this.apiUrl + 'products/getlist');
  }
}
