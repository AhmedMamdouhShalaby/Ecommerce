import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
// input ----> formControl --- > <input> //
// inputs ---> formGroup ----> <form> //

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }
  msgError: string = '';

  loading: boolean = false;

  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  //   rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // })

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: [this.confirmPassword] } as FormControlOptions)



  confirmPassword(group: FormGroup): void {

    const password = group.get('password');

    const rePassword = group.get('rePassword');

    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true })
    } else if (password?.value != rePassword?.value) {

      rePassword?.setErrors({ notMacth: true })

    }

  }

  handleForm(): void {
    if (this.registerForm.valid) {
      this.loading = true
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.loading = false;
            this._Router.navigate(['/login'])
          }
          console.log(response);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          console.log(err.error.message);
          this.msgError = err.error.message
        }
      })
    }


  }
}
