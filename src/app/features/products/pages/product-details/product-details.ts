import { Component, inject, OnInit } from '@angular/core';
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { ProductService } from '../../services/productService';
import { ActivatedRoute } from '@angular/router';
import { ISingleProduct } from '../../interfaces/ISingleProduct';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-product-details',
  imports: [HeaderTitle, LoadingSpinner],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  // Injected Services
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  // Variables
  productId!: string;
  product!: ISingleProduct;

  constructor() {
    this.productId = this._ActivatedRoute.snapshot.paramMap.get(
      'productId'
    ) as string;
  }

  ngOnInit(): void {
    this.getSingleProduct();
  }

  getSingleProduct(): void {
    this._ProductService.getSingleProduct(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
      },
    });
  }
}
