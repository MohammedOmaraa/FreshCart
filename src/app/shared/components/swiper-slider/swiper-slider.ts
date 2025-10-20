import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-swiper-slider',
  imports: [],
  templateUrl: './swiper-slider.html',
  styleUrl: './swiper-slider.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperSlider {
  @Input({ required: true }) data!: any;
  @Input() slidesPerView = '1';
  @Input() effect = 'slide';
}
