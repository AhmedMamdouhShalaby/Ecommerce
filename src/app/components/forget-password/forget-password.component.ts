import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _EcomdataService: EcomdataService, private _NgxSpinnerService: NgxSpinnerService, private _FormBuilder: FormBuilder, private _Router: Router) { }
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;

  userMsg: string = '';

  email: string = '';

  forgetForm: FormGroup = this._FormBuilder.group({
    email: ['', Validators.required]
  })

  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: ['', Validators.required]
  })
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    newPassword: ['', Validators.required]
  })


  forgetPassword(): void {
    this._NgxSpinnerService.show()
    let userEmail = this.forgetForm.value
    this.email = userEmail.email
    this._EcomdataService.forgetPassword(userEmail).subscribe({
      next: (response) => {
        console.log(response);
        this.userMsg = response.message
        this.step1 = false;
        this.step2 = true;

        this._NgxSpinnerService.hide()
      },
      error: (err) => {
        console.log(err);
        this.userMsg = err.error.message
        this._NgxSpinnerService.hide()

      }
    })
  }

  resetCode(): void {
    this._NgxSpinnerService.show()

    let resetCode = this.resetCodeForm.value
    this._EcomdataService.resetCode(resetCode).subscribe({
      next: (response) => {
        this.userMsg = response.status
        console.log(response);
        this._NgxSpinnerService.hide()
        this.step2 = false;
        this.step3 = true;
      },
      error: (error) => {
        console.log(error);
        this.userMsg = error.error.message
        this._NgxSpinnerService.hide()

      }
    })
  }

  resetPassword(): void {
    this._NgxSpinnerService.show()

    let resetPassword = this.resetPasswordForm.value;

    resetPassword.email = this.email



    this._EcomdataService.resetPassword(resetPassword).subscribe({
      next: (response) => {
        console.log(response);
        this._NgxSpinnerService.hide()
        if (response.token) {
          localStorage.setItem('etoken', response.token)
          this._Router.navigate(['/home'])
        }
      },
      error: (error) => {
        console.log(error);
        this._NgxSpinnerService.hide()

      }
    })
  }
}
