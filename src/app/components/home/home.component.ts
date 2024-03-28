import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { Product } from 'src/app/shared/service/product';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { WhishlistService } from 'src/app/shared/service/whishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService, private _AddToCartService: AddToCartService, private _ToastrService: ToastrService, private _NgxSpinnerService: NgxSpinnerService, private _WhishlistService: WhishlistService) { }

  products: Product[] = []
  categories: any[] = [];

  dataIds: string[] = []; // array of data ids after remove or add

  favCount: number = 0;

  searchTerm: string = '';

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: [``, ``],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  HeaderSliderOptions: OwlOptions = {
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



  cartNumber: number = 0;

  ngOnInit(): void {

    this._NgxSpinnerService.show()
    this._EcomdataService.getAllproducts().subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide()

        this.products = response.data

      },
      error: (err) => {
        console.log(err);
      }


    })

    // get categories //

    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data.slice()
      },
      error: (error) => {
        console.log(error);

      }
    })


    this._WhishlistService.getWhishlist().subscribe({
      next: (response) => {

        this._WhishlistService.favNumber.next(response.count)

        const newData = response.data.map((item: any) => item._id)

        this.dataIds = newData


      },
      error: (error) => {
        console.log(error);

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


  addToFav(id: string): void {
    this._NgxSpinnerService.show()

    this._WhishlistService.addToWhishlist(id).subscribe({
      next: (response) => {
        this._WhishlistService.favNumber.next(response.data.length)

        this.dataIds = response.data
        console.log(this.dataIds);



        this._NgxSpinnerService.hide()
        this._ToastrService.success(response.message)
      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()

      }
    })
  }

  removeitem(id: string): void {
    this._NgxSpinnerService.show()

    this._WhishlistService.removeItemFromWhishlist(id).subscribe({
      next: (response) => {
        this.dataIds = response.data
        this._WhishlistService.favNumber.next(response.data.length)
        console.log('inside home', response);


        console.log(this.dataIds);

        this._ToastrService.error(response.message)
        this._NgxSpinnerService.hide()

      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()


      }
    })
  }

}

