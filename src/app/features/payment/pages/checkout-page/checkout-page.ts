import { Component, inject, OnInit } from '@angular/core';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment';
import { ICashPayRes } from '../../interfaces/ICashPay';
import { IOnlinePayRes } from '../../interfaces/IOnlinePay';

@Component({
  selector: 'app-checkout-page',
  imports: [HeaderTitle, ReactiveFormsModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Router = inject(Router);
  private readonly _PaymentService = inject(PaymentService);

  paymentForm!: FormGroup;
  cartId!: string;

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      details: [],
      phone: [],
      city: [],
    });
    this.cartId = this._ActivatedRoute.snapshot.paramMap.get('cartId')!;
  }

  pay(method: string): void {
    console.log(this.cartId);

    if (method == 'cash') {
      this.cashPayment();
    } else {
      this.onlinePayment();
    }
  }

  cashPayment() {
    this._PaymentService
      .cashPayment({ shippingAddress: this.paymentForm.value }, this.cartId)
      .subscribe((res: ICashPayRes) => {
        console.log(res);
        this._Router.navigateByUrl('/orders/all');
      });
  }

  onlinePayment() {
    this._PaymentService
      .onlinePayment({ shippingAddress: this.paymentForm.value }, this.cartId)
      .subscribe((res: IOnlinePayRes) => {
        window.open(res.session.url, '_self');
      });
  }
}
