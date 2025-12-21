import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categoriesService';
import { ICategoryData } from '../../../categories/interfaces/IAllCategories';
import { SwiperSlider } from "../../../../shared/components/swiper-slider/swiper-slider";
import { HeaderTitle } from '../../../../shared/components/header-title/header-title';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-slider',
  imports: [SwiperSlider, HeaderTitle, TranslatePipe],
  templateUrl: './categories-slider.html',
  styleUrl: './categories-slider.css',
})
export class CategoriesSlider implements OnInit {
  // Injected Services
  private readonly _CategoriesService = inject(CategoriesService);

  // Variables
  allCategories!: ICategoryData[];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
    });
  }
}
