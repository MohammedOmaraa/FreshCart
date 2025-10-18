import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { AppApis } from '../../../core/constants/appApis';
import { IAllProductsApiRes } from '../interfaces/IAllProducts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly _BaseHttp = inject(BaseHttp);

  getAllProducts(): Observable<IAllProductsApiRes> {
    return this._BaseHttp.get<IAllProductsApiRes>(AppApis.AllProductsURL);
  }
}
