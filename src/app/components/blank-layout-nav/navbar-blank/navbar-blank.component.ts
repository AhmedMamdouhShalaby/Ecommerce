import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartComponent } from '../../cart/cart.component';
import { AddToCartService } from 'src/app/shared/services/add-to-cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WhishlistService } from 'src/app/shared/service/whishlist.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Renderer2: Renderer2, private _AddToCartService: AddToCartService, private _WhishlistService: WhishlistService) { }



  cartCount: number = 0;

  favCount: number = 0;


  ngOnInit(): void {
    this._AddToCartService.cartNumber.subscribe({
      next: (num) => {
        this.cartCount = num;
      }
    })


    this._WhishlistService.favNumber.subscribe({
      next: (number) => {

        this.favCount = number;


      }
    })


    this._AddToCartService.getUserCart().subscribe({
      next: (response) => {
        this._AddToCartService.cartNumber.next(response.numOfCartItems)
      }
    })

  }

  @ViewChild('navBar') navBarElement!: ElementRef

  @HostListener('window:scroll')
  onScroll(): void {

    if (scrollY > 300) {
      this._Renderer2.addClass(this.navBarElement.nativeElement, 'px-5')
      this._Renderer2.addClass(this.navBarElement.nativeElement, 'shadow')

    } else {
      this._Renderer2.removeClass(this.navBarElement.nativeElement, 'px-5')
      this._Renderer2.removeClass(this.navBarElement.nativeElement, 'shadow')


    }
  }

  logOut(): void {
    this._AuthService.logOutUser()
  }




}
