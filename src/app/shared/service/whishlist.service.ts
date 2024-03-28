import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  constructor(private _HttpClient: HttpClient) { }


  favNumber: BehaviorSubject<number> = new BehaviorSubject(0)

  myHeader: any = { token: localStorage.getItem('etoken') }

  addToWhishlist(productId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: productId },
      { headers: this.myHeader }

    )
  }

  getWhishlist(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: this.myHeader }
    )
  }

  removeItemFromWhishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: this.myHeader }
    )
  }
}
