import { Component } from '@angular/core';
import { MainSlider } from "../../components/main-slider/main-slider";
import { CategoriesSlider } from "../../components/categories-slider/categories-slider";
import { PopularProducts } from "../../components/popular-products/popular-products";

@Component({
  selector: 'app-user-home-page',
  imports: [MainSlider, CategoriesSlider, PopularProducts],
  templateUrl: './user-home-page.html',
  styleUrl: './user-home-page.css'
})
export class UserHomePage {

}
