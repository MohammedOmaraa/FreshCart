import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { OrderApis } from '../orderApis';
import { IAllOrdersRes } from '../interfaces/IAllOrders';
import { Observable, of, switchMap, take } from 'rxjs';
import { AuthServices } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _BaseHttp = inject(BaseHttp);
  private readonly _AuthServices = inject(AuthServices);

  getUserAllOrders(): Observable<IAllOrdersRes[]> {
    const userId = this._AuthServices.getUserId();
    if (userId) {
      return this._BaseHttp.get<IAllOrdersRes[]>(OrderApis.GetUserOrders(userId));
    }

    // wait until AuthService is ready
    return this._AuthServices.ready$().pipe(
      take(1),
      switchMap(isReady => {
        if (!isReady) return of([] as IAllOrdersRes[]);
        const id = this._AuthServices.getUserId()!;
        return this._BaseHttp.get<IAllOrdersRes[]>(OrderApis.GetUserOrders(id));
      })
    );
  }
}
