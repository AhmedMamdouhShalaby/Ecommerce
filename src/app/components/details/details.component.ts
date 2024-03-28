import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { Product } from 'src/app/shared/service/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _EcomdataService: EcomdataService, private _AddToCartService: AddToCartService, private _ToastrService: ToastrService, private _NgxSpinnerService: NgxSpinnerService) { }
  productDetails: Product = {} as Product;


  productsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: [``, ``],
    items: 1,
    nav: true
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct: any = params.get('id');
        this._EcomdataService.getDetails(idProduct).subscribe({
          next: (resposne) => {
            this.productDetails = resposne.data;
            this._NgxSpinnerService.hide()

            console.log(this.productDetails);
          }
        })
      }
    })
  }

  addCart(id: string) {
    this._NgxSpinnerService.show()

    this._AddToCartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._NgxSpinnerService.hide()
        this._AddToCartService.cartNumber.next(response.numOfCartItems)

        this._ToastrService.success(response.message, 'Fresh Cart')
      },
      error: (error) => {
        this._NgxSpinnerService.hide()

        console.log(error);
      }
    })
  }

}
