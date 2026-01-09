import { inject, Injectable, signal } from '@angular/core';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { PaymentApis } from '../payment.apis';
import { ICashPayRes } from '../interfaces/ICashPay';
import { IShippingAddress } from '../interfaces/IShippingAddress';
import { IOnlinePayRes } from '../interfaces/IOnlinePay';
import { environments } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // Inject Services
  private readonly http = inject(BaseHttp);
  private readonly router = inject(Router);
  loading = signal<boolean>(false);

  cashPayment(shippingAddress: IShippingAddress, cartId: string): void {
    this.http
      .post<ICashPayRes, IShippingAddress>(
        `${PaymentApis.CashPayment}/${cartId}`,
        shippingAddress
      )
      .subscribe((res: ICashPayRes) => {
        console.log(res);
        this.router.navigateByUrl('/orders/all');
      });
  }

  onlinePayment(shippingAddress: IShippingAddress, cartId: string): void {
    this.http
      .post<IOnlinePayRes, IShippingAddress>(
        `${PaymentApis.OnlinePayment}/${cartId}?url=${environments.AppURL}`,
        shippingAddress
      )
      .subscribe((res: IOnlinePayRes) => {
        window.open(res.session.url, '_self');
      });
  }
}
