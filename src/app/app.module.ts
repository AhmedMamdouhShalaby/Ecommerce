import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailsComponent } from './components/details/details.component';
import { BlankLayoutNavComponent } from './components/blank-layout-nav/blank-layout-nav.component';
import { AuthLayoutNavComponent } from './components/auth-layout-nav/auth-layout-nav.component';
import { NavbarBlankComponent } from './components/blank-layout-nav/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './components/auth-layout-nav/navbar-auth/navbar-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ByPipe } from './by.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpiecificCategoryComponent } from './components/spiecific-category/spiecific-category.component';
import { SpiecificBrandComponent } from './components/spiecific-brand/spiecific-brand.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    DetailsComponent,
    BlankLayoutNavComponent,
    AuthLayoutNavComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    ByPipe,
    SearchPipe,
    PaymentComponent,
    AllordersComponent,
    SpinnerComponent,
    SpiecificCategoryComponent,
    SpiecificBrandComponent,
    ForgetPasswordComponent,
    WhishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
