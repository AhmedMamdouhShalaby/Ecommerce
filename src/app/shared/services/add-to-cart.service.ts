import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private _HttpClient: HttpClient) { }

  header: any = { token: localStorage.getItem('etoken') };

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0)

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId },
      { headers: this.header }
    )
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: this.header }
    );
  }

  removeCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers: this.header }
    )
  }

  updateCartProduct(productId: string, updateCount: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        "count": updateCount
      },
      { headers: this.header }
    )
  }


  payMentVisa(productId: string, userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=http://localhost:4200`,
      {

        shippingAddress: userData

      },
      { headers: this.header }
    )
  }

  getOrders(userId: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }
}
