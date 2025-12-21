import { Component } from '@angular/core';
import { MainSlider } from "../../components/main-slider/main-slider";
import { CategoriesSlider } from "../../components/categories-slider/categories-slider";
import { PopularProducts } from "../../components/popular-products/popular-products";
import { SubscribeBanner } from "../../../../shared/components/subscribe-banner/subscribe-banner";

@Component({
  selector: 'app-user-home-page',
  imports: [MainSlider, CategoriesSlider, PopularProducts, SubscribeBanner],
  templateUrl: './user-home-page.html',
  styleUrl: './user-home-page.css'
})
export class UserHomePage {

}
