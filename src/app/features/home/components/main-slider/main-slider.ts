import { Component } from '@angular/core';
import { SwiperSlider } from '../../../../shared/components/swiper-slider/swiper-slider';

@Component({
  selector: 'app-main-slider',
  imports: [SwiperSlider],
  templateUrl: './main-slider.html',
  styleUrl: './main-slider.css',
})
export class MainSlider {
  images = [
    { image: 'main-slider/img1.avif' },
    { image: 'main-slider/img2.avif' },
    { image: 'main-slider/img3.avif' },
    { image: 'main-slider/img4.avif' },
    { image: 'main-slider/img5.avif' },
    { image: 'main-slider/img6.avif' },
    { image: 'main-slider/img7.avif' },
  ];
}
