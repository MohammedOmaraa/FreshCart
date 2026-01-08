import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../features/products/interfaces/IAllProducts';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { Heart , LucideAngularModule, ShoppingCart } from 'lucide-angular';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LucideAngularModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() data!: IProduct;
  isLoading: boolean = false;
  HeartIcon = Heart 
  ShoppingCartIcon  = ShoppingCart

  // Inject Services
  private readonly cartService = inject(CartService);

  addProductToCart(productId: string): void {
    this.isLoading = true;
    this.cartService.addProduct(productId)
  }
}
