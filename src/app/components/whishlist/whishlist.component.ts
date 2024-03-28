import { Product } from './../../shared/service/product';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/shared/service/whishlist.service';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  constructor(private _WhishlistService: WhishlistService, private _ToastrService: ToastrService, private _NgxSpinnerService: NgxSpinnerService, private _AddToCartService: AddToCartService) { }

  products: Product[] = []

  dataIds: string[] = []; // array of data ids after remove or add



  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._WhishlistService.getWhishlist().subscribe({
      next: (response) => {
        this.products = response.data
        const newData = response.data.map((item: any) => item._id)

        this.dataIds = newData

        this._NgxSpinnerService.hide()


      },
      error: (error) => {
        console.log(error);

      }
    })
  }




  removeitem(id: string): void {
    this._NgxSpinnerService.show()

    this._WhishlistService.removeItemFromWhishlist(id).subscribe({
      next: (response) => {
        this.dataIds = response.data

        this._WhishlistService.favNumber.next(response.data.length)

        console.log();


        this._WhishlistService.getWhishlist().subscribe({
          next: (response) => {
            this.products = response.data

          },
          error: (error) => {
            console.log(error);

          }
        })

        this._ToastrService.error(response.message)
        this._NgxSpinnerService.hide()

      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()


      }
    })
  }


  AddCart(id: string) {
    this._NgxSpinnerService.show()

    this._AddToCartService.addToCart(id).subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide()

        this._AddToCartService.cartNumber.next(response.numOfCartItems)

        this._ToastrService.success(response.message, 'Fresh Cart')
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
}
