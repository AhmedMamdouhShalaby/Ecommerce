import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }
  loading: boolean = false;
  msgError: string = '';

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })

  handleForm() {
    if (this.loginForm.valid) {
      this.loading = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {

          if (response.message == 'success')
            this.loading = false;
          localStorage.setItem('etoken', response.token)
          this._AuthService.decodingUserToken();
          this._Router.navigate(['/home'])
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.loading = false;
        }
      })
    } else {
      this.loginForm.markAsTouched()
    }


  }
}

