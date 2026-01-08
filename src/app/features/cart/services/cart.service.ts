import { CartApi } from '../cart.api';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { Observable } from 'rxjs';
import { IGetCartRes } from '../interfaces/IGetCartRes';
import { IAddProductCartRes } from '../interfaces/IAddProductCartRes';
import { IUpdateProductCartRes } from '../interfaces/IUpdateProductCartRes';
import { IDeleteProductCartRes } from '../interfaces/IDeleteProductCartRes';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Inject Services
  private readonly _BaseHttp = inject(BaseHttp);
  private platform = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platform);

  // Signals (State)
  private readonly cartSignal = signal<IGetCartRes | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  readonly cart = this.cartSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  addProduct(productId: string): void {
    this._BaseHttp
      .post<IAddProductCartRes, { productId: string }>(CartApi.Add, {
        productId,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  updateProduct(productId: string, count: string): void {
    this._BaseHttp
      .put<IUpdateProductCartRes, { count: string }>(
        CartApi.Update(productId),
        { count }
      )
      .subscribe((res) => {
        this.cartSignal.set(res);
      });
  }

  deleteProduct(productId: string): void {
    this._BaseHttp
      .delete<IDeleteProductCartRes>(CartApi.Delete(productId))
      .subscribe((res) => {
        this.cartSignal.set(res);
      });
  }

  getCart(): void {
    if (!this.isBrowser) {
      return;
    }
    
    if (this.cartSignal()) {
      this.loadingSignal.set(false);
    } else {
      this.loadingSignal.set(true);
    }

    this._BaseHttp.get<IGetCartRes>(CartApi.Get).subscribe((res) => {
      this.cartSignal.set(res);
      this.loadingSignal.set(false);
    });
  }

  clearCart(): void {
    this._BaseHttp
      .delete<{ message: string }>(CartApi.Clear)
      .subscribe((res) => {
        this.cartSignal.set(null);
      });
  }
}
