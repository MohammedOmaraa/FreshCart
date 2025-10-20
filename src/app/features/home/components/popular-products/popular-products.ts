import { Component, inject } from '@angular/core';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { HeaderTitle } from "../../../../shared/components/header-title/header-title";
import { ProductService } from '../../../products/services/productService';
import { IProduct } from '../../../products/interfaces/IAllProducts';
import {  ProductCard } from "../../../../shared/components/product-card/product-card";

@Component({
  selector: 'app-popular-products',
  imports: [LoadingSpinner, HeaderTitle, ProductCard],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css'
})
export class PopularProducts {
// Injected Services
  private readonly _ProductService = inject(ProductService);

  // Variables
  allProducts!: IProduct[];


  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
    });
  }
}
