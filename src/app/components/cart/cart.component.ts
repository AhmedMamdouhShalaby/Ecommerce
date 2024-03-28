import { Component, OnInit } from '@angular/core';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _AddToCartService: AddToCartService, private _ToastrService: ToastrService, private _NgxSpinnerService: NgxSpinnerService) { }

  productIncart: any = {};

  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._AddToCartService.getUserCart().subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide()

        console.log(response.data.products.length);

        this.productIncart = response.data;
      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()

      }
    })

  }

  removeFromCart(id: string): void {
    this._NgxSpinnerService.show()

    this._AddToCartService.removeCartItem(id).subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide()
        this._AddToCartService.cartNumber.next(response.numOfCartItems)

        console.log(response);
        this.productIncart = response.data
        this._ToastrService.error('item removed from your card successfully')
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  updateQuantity(id: string, count: number) {
    if (count > 0) {
      this._NgxSpinnerService.show()

      this._AddToCartService.updateCartProduct(id, count).subscribe({

        next: (response) => {
          this._NgxSpinnerService.hide()
          this.productIncart = response.data

        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (count < 1) {
      this.removeFromCart(id)
    }
  }



}
