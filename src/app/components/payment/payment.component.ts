import { AddToCartService } from './../../shared/services/add-to-cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _ActivatedRoute: ActivatedRoute, private _AddToCartService: AddToCartService, private _NgxSpinnerService: NgxSpinnerService) { }
  checkUserDetails: FormGroup = this._FormBuilder.group({
    name: [null],
    details: [null],
    phone: [null],
    city: [null],
  })

  cartId: any = ''

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this._NgxSpinnerService.hide()
        this.cartId = params.get('id')
      }
    })
  }
  handleForm(): void {
    console.log(this.checkUserDetails.value);
    this._NgxSpinnerService.show()

    this._AddToCartService.payMentVisa(this.cartId, this.checkUserDetails.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'success') {
          window.open(response.session.url, '_self')
          this._NgxSpinnerService.hide()
        }
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
}
