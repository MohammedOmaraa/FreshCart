import { CartApi } from '../cart.api';
import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { Observable } from 'rxjs';
import { IGetCartRes } from '../interfaces/IGetCartRes';
import { IAddProductCartRes } from '../interfaces/IAddProductCartRes';
import { IUpdateProductCartRes } from '../interfaces/IUpdateProductCartRes';
import { IDeleteProductCartRes } from '../interfaces/IDeleteProductCartRes';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Inject Services
  private readonly _BaseHttp = inject(BaseHttp);

  addProduct(productId: string): Observable<IAddProductCartRes> {
    return this._BaseHttp.post<IAddProductCartRes, { productId: string }>(
      CartApi.Add,
      { productId }
    );
  }

  updateProduct(
    productId: string,
    count: string
  ): Observable<IUpdateProductCartRes> {
    return this._BaseHttp.put<IUpdateProductCartRes, { count: string }>(
      CartApi.Update(productId),
      { count }
    );
  }

  deleteProduct(productId: string): Observable<IDeleteProductCartRes> {
    return this._BaseHttp.delete<IDeleteProductCartRes>(
      CartApi.Delete(productId)
    );
  }

  getCart(): Observable<IGetCartRes> {
    return this._BaseHttp.get<IGetCartRes>(CartApi.Get);
  }

  clearCart(): Observable<{ message: string }> {
    return this._BaseHttp.delete<{ message: string }>(CartApi.Clear);
  }
}
