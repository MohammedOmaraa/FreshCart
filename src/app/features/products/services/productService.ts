import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { AppApis } from '../../../core/constants/appApis';
import { IAllProductsApiRes } from '../interfaces/IAllProducts';
import { Observable } from 'rxjs';
import { ISingleProductApiRes } from '../interfaces/ISingleProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _BaseHttp = inject(BaseHttp);

  getAllProducts(): Observable<IAllProductsApiRes> {
    return this._BaseHttp.get<IAllProductsApiRes>(AppApis.AllProductsURL);
  }

  getSingleProduct(productId: string): Observable<ISingleProductApiRes> {
    return this._BaseHttp.get<ISingleProductApiRes>(
      `${AppApis.SingleProductsURL}/${productId}`
    );
  }
}
