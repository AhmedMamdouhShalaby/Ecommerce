import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }
  userData: any;
  decodingUserToken() {
    if (localStorage.getItem('etoken') != null) {
      let encodeToken: any = localStorage.getItem('etoken');
      let decodeToken = jwtDecode(encodeToken)
      console.log(decodeToken);
      this.userData = decodeToken
    }
  }

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData)
  }

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData)
  }

  logOutUser(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
}
