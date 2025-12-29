import { computed, inject, Injectable, signal } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { AppApis } from '../../../core/constants/appApis';
import { IAllProductsApiRes, IProduct } from '../interfaces/IAllProducts';
import { Observable } from 'rxjs';
import {
  ISingleProduct,
  ISingleProductApiRes,
} from '../interfaces/ISingleProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(BaseHttp);

  // Signals (State)
  private readonly productsSignal = signal<IProduct[] | null>(null);
  private readonly productSignal = signal<ISingleProduct | null>(null);

  readonly products = this.productsSignal.asReadonly();
  readonly product = this.productSignal.asReadonly();

  getAllProducts(): void {
    this.http
      .get<IAllProductsApiRes>(AppApis.AllProductsURL)
      .subscribe((res) => {
        this.productsSignal.set(res.data);
      });
  }


  getSingleProduct(productId: string): void {
    this.productSignal.set(null);
    this.http
      .get<ISingleProductApiRes>(`${AppApis.SingleProductsURL}/${productId}`)
      .subscribe(res => {
        this.productSignal.set(res.data);
      });
  }
}
