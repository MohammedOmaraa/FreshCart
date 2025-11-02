import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ICartData, IProduct } from '../../interfaces/ICart';
import { IDeleteProductCartRes } from '../../interfaces/IDeleteProductCartRes';
import { IUpdateProductCartRes } from '../../interfaces/IUpdateProductCartRes';
import { IGetCartRes } from '../../interfaces/IGetCartRes';

@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, LoadingSpinner, CurrencyPipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  // Injected Services
  private readonly _CartService = inject(CartService);

  // Variables
  cartData!: ICartData | undefined;
  cartId!: string;
  numOfCartItems!: number;
  totalPrice!: number;
  isCartLoaded: boolean = false;

  private _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.getCart();
    }
  }

  getCart(): void {
    this._CartService.getCart().subscribe({
      next: (res: IGetCartRes) => {
        this.cartData = res.data;
        this.isCartLoaded = true;
        this.cartId = res.cartId;
        this.numOfCartItems = res.numOfCartItems;
        this.totalPrice = res.data.totalCartPrice;
      },
      error: () => {
        this.isCartLoaded = true;
      },
    });
  }

  updateProduct(prouct: IProduct, countUpdate: number): void {
    console.log(countUpdate);

    this._CartService
      .updateProduct(prouct.product._id, String(prouct.count + countUpdate))
      .subscribe({
        next: (res: IUpdateProductCartRes) => {
          this.getCart();
        },
      });
  }

  deleteProduct(prouctId: string): void {
    this._CartService.deleteProduct(prouctId).subscribe({
      next: (res: IDeleteProductCartRes) => {
        this.cartData = res.data;
        this.cartId = res.cartId;
        this.numOfCartItems = res.numOfCartItems;
        this.totalPrice = res.data.totalCartPrice;
      },
    });
  }

  clearCart(): void {
    this.isCartLoaded = true;
    this._CartService.clearCart().subscribe({
      next: (res: { message: string }) => {
        console.log(res.message);
        this.cartData = undefined;
      },
      error: () => {
        this.isCartLoaded = true;
      },
    });
  }
}
