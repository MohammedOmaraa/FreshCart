import { Component, Input } from '@angular/core';
import { IProduct } from '../../../features/products/interfaces/IAllProducts';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() data!: IProduct;
}
