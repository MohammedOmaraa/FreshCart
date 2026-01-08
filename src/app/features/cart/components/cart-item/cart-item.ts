import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule, Trash2, Plus, Minus } from 'lucide-angular';
import { IProduct } from '../../interfaces/ICart';
import { CartService } from '../../services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  imports: [LucideAngularModule, TranslatePipe, RouterLink],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  // Injected Services
  private readonly cartService = inject(CartService);

  // Icons
  readonly trashIcon = Trash2;
  readonly plusIcon = Plus;
  readonly minusIcon = Minus;

  item = input.required<IProduct>();

  canDecrementCount = computed<boolean>(() => this.item().count > 1);

  deleteProduct(productId: string) {
    this.cartService.deleteProduct(productId);
  }

  updateProduct(prouctId: string, count: number, countUpdate: number): void {
    this.cartService.updateProduct(prouctId, String(count + countUpdate));
  }
}
