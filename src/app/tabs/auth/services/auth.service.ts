import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient,
  ) { }

  login(authModel: AuthModel|any){
    return this.httpClient.post(this.apiUrl + 'users/login', authModel);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
}
