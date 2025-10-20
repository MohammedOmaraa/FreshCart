import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categoriesService';
import { ICategoryData } from '../../../categories/interfaces/IAllCategories';
import { SwiperSlider } from "../../../../shared/components/swiper-slider/swiper-slider";

@Component({
  selector: 'app-categories-slider',
  imports: [SwiperSlider],
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
