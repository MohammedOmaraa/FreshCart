import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProductService } from '../../services/productService';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { CommonModule, CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { LucideAngularModule, Heart, Star, MoveRight } from 'lucide-angular';
import { SoldFormatPipe } from '../../pipes/sold-format-pipe';
import { ISingleProduct } from '../../interfaces/ISingleProduct';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [
    SoldFormatPipe,
    LoadingSpinner,
    DatePipe,
    CurrencyPipe,
    CommonModule,
    LucideAngularModule,
    TranslatePipe
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  // Injected Services
  protected readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  // product data
  readonly product = computed(
    () => this.productService.product() 
  );

  // Icons
  readonly heartIcon = Heart;
  readonly starIcon = Star;
  readonly moveRightIcon = MoveRight;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('productId') as string;
    this.productService.getSingleProduct(id);
  }

  selectedImage = signal<string | null>(null);

  images = computed<string[]>(() => {
    const prod = this.product();
    return prod ? [prod.imageCover, ...prod.images] : [];
  });

  effectMainImage = effect(() => {
    const imgs = this.images();
    if (!this.selectedImage() && imgs.length > 0) {
      this.selectedImage.set(imgs[0]);
    }
  });

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }
}
