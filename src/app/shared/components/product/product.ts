import { Component, Input } from '@angular/core';
import { IProduct } from '../../../features/products/interfaces/IAllProducts';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  @Input() data!: IProduct;
}
