import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';
import { HomeComponent } from '../home/home.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _AddToCartService: AddToCartService, private _NgxSpinnerService: NgxSpinnerService) { }

  products: any;

  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this._AuthService.decodingUserToken()
    let userId = this._AuthService.userData.id

    this._AddToCartService.getOrders(userId).subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide()
        this.products = response
      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()

      }
    })

  }


}
