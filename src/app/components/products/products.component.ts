import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { WhishlistService } from 'src/app/shared/service/whishlist.service';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService, private _AddToCartService: AddToCartService, private _ToastrService: ToastrService, private _NgxSpinnerService: NgxSpinnerService, private _WhishlistService: WhishlistService) { }

  allProducts: any;

  pageSize: number = 0; //limit

  currentPage: number = 1 // currentPage

  totalPages: number = 0; // results

  dataIds: string[] = []; // array of data ids after remove or add


  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._EcomdataService.getAllproducts().subscribe({
      next: (response) => {


        this.allProducts = response.data
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.totalPages = response.results
        this._NgxSpinnerService.hide()

      },
      error: (error) => {
        this._NgxSpinnerService.hide()

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


  addToCartFromProducts(id: string): void {
    this._NgxSpinnerService.show()
    this._AddToCartService.addToCart(id).subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide()
        this._AddToCartService.cartNumber.next(response.numOfCartItems)
        this._ToastrService.success(response.message, 'Fresh Cart')
      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()

      }
    })
  }


  pageChanged(event: any): void {
    this._NgxSpinnerService.show()

    this._EcomdataService.getAllproducts(event).subscribe({
      next: (response) => {


        this.allProducts = response.data
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.totalPages = response.results
        this._NgxSpinnerService.hide()

      },
      error: (error) => {
        this._NgxSpinnerService.hide()

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
