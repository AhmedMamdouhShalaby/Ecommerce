import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutNavComponent } from './components/blank-layout-nav/blank-layout-nav.component';
import { AuthLayoutNavComponent } from './components/auth-layout-nav/auth-layout-nav.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './shared/service/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { SpiecificCategoryComponent } from './components/spiecific-category/spiecific-category.component';
import { SpiecificBrandComponent } from './components/spiecific-brand/spiecific-brand.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';

const routes: Routes = [
  {
    path: '', canActivate: [authGuard], component: BlankLayoutNavComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'payment/:id', component: PaymentComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'spiecificcategory/:id', component: SpiecificCategoryComponent },
      { path: 'spiecificbrand/:name/:id', component: SpiecificBrandComponent },
      { path: 'forgetpassword', component: ForgetPasswordComponent },
      { path: 'whishlist', component: WhishlistComponent },


    ]
  },
  {
    path: '', component: AuthLayoutNavComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
