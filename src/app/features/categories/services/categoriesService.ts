import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { AppApis } from '../../../core/constants/appApis';
import { Observable } from 'rxjs';
import { IAllCategoriesApiRes } from '../interfaces/IAllCategories';
import { ISingleCategoryApiRes } from '../interfaces/ISingleCategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _BaseHttp = inject(BaseHttp);

  getAllCategories(): Observable<IAllCategoriesApiRes> {
    return this._BaseHttp.get<IAllCategoriesApiRes>(AppApis.AllCategoriesURL);
  }

//   getSingleCategory(categoryId: string): Observable<ISingleCategoryApiRes> {
//     return this._BaseHttp.get<ISingleCategoryApiRes>(
//       `${AppApis.SingleCategoryURL}/${categoryId}`
//     );
//   }
}
