import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categoriesService';
import { ICategoryData } from '../../interfaces/IAllCategories';
import { HeaderTitle } from "../../../../shared/components/header-title/header-title";
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";

@Component({
  selector: 'app-categories-page',
  imports: [HeaderTitle, LoadingSpinner],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage implements OnInit {
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
