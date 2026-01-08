import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import {
  LucideAngularModule,
  Trash,
  ReceiptText,
  MoveRight
} from 'lucide-angular';
import { CartItem } from '../../components/cart-item/cart-item';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-page',
  imports: [
    RouterLink,
    LoadingSpinner,
    CurrencyPipe,
    FormsModule,
    CommonModule,
    HeaderTitle,
    LucideAngularModule,
    CartItem,
    TranslatePipe
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  // Injected Services
  protected readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getCart();
  }
  readonly cart = computed(() => this.cartService.cart());

  readonly trashIcon = Trash;
  readonly receiptTextIcon = ReceiptText;
  readonly moveRightIcon = MoveRight;

  promoCode: string = '';
  shippingEstimate: number = 0.0;
  tax: number = 0.0;

  getCart(): void {
    this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
