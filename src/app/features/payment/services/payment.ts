import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { Observable } from 'rxjs';
import { PaymentApis } from '../payment.apis';
import { ICashPayRes } from '../interfaces/ICashPay';
import { IShippingAddress } from '../interfaces/IShippingAddress';
import { IOnlinePayRes } from '../interfaces/IOnlinePay';
import { environments } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // Inject Services
  private readonly _BaseHttp = inject(BaseHttp);

  cashPayment(
    shippingAddress: IShippingAddress,
    cartId: string
  ): Observable<ICashPayRes> {
    return this._BaseHttp.post<ICashPayRes, IShippingAddress>(
      `${PaymentApis.CashPayment}${cartId}`,
      shippingAddress
    );
  }

  onlinePayment(
    shippingAddress: IShippingAddress,
    cartId: string
  ): Observable<IOnlinePayRes> {
    return this._BaseHttp.post<IOnlinePayRes, IShippingAddress>(
      `${PaymentApis.OnlinePayment}${cartId}?url=${environments.AppURL}`,
      shippingAddress
    );
  }
}
