import { Component, inject } from '@angular/core';
import { Products } from '../../services/products';
import { IAllProductsApiRes, IProduct } from '../../interfaces/IAllProducts';

@Component({
  selector: 'app-products-page',
  imports: [],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  // Injected Services
  private readonly _Products = inject(Products);

  // Variables
  allProducts!: IProduct[];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._Products.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
    });
  }
}
