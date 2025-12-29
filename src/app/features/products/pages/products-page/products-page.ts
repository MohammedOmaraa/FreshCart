import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { IProduct } from '../../interfaces/IAllProducts';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-products-page',
  imports: [HeaderTitle, LoadingSpinner, ProductCard],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit {
  // Injected Services
  protected readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getAllProducts();
  }
}
