import { Component, inject } from '@angular/core';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ProductService } from '../../../products/services/productService';
import { IProduct } from '../../../products/interfaces/IAllProducts';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-products',
  imports: [LoadingSpinner, HeaderTitle, ProductCard, TranslatePipe],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts {
  // Injected Services
  protected readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getAllProducts();
  }
}
