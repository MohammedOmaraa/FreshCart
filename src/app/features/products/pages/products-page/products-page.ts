import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { IProduct } from '../../interfaces/IAllProducts';
import { HeaderTitle } from "../../../../shared/components/header-title/header-title";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";

@Component({
  selector: 'app-products-page',
  imports: [HeaderTitle, LoadingSpinner],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit{
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
