import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment';
import { Input } from '../../../../shared/components/input/input';
import {
  Building2,
  Phone,
  MapPinHouse,
  LucideAngularModule,
  Banknote,
  CreditCard,
  MoveRight,
} from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Textarea } from '../../../../shared/components/textarea/textarea';

@Component({
  selector: 'app-checkout-page',
  imports: [
    HeaderTitle,
    ReactiveFormsModule,
    Input,
    TranslatePipe,
    Textarea,
    LucideAngularModule,
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly paymentService = inject(PaymentService);
  readonly paymentMethod = signal<'cash' | 'online'>('cash');

  paymentForm!: FormGroup;
  readonly cartId = this.activatedRoute.snapshot.paramMap.get('cartId') ?? '';

  readonly icons = {
    city: Building2,
    phone: Phone,
    address: MapPinHouse,
    cash: Banknote,
    card: CreditCard,
    next: MoveRight,
  };

  ngOnInit(): void {
    this.paymentForm = this.fb.nonNullable.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, [Validators.required]],
    });
  }

  selectMethod(method: 'cash' | 'online') {
    this.paymentMethod.set(method);
  }

  confirmOrder(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const payload = {
      shippingAddress: this.paymentForm.getRawValue(),
    };

    if (this.paymentMethod() === 'cash') {
      this.paymentService.cashPayment(payload, this.cartId);
    } else {
      this.paymentService.onlinePayment(payload, this.cartId);
    }
  }
}
