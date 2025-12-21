import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperSlider } from '../../../../shared/components/swiper-slider/swiper-slider';
import { Swiper } from 'swiper/types';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-main-slider',
  imports: [SwiperSlider, SlicePipe],
  templateUrl: './main-slider.html',
  styleUrl: './main-slider.css',
})
export class MainSlider {
  images = [
    { image: './main-slider/img1.avif' },
    { image: './main-slider/img2.avif' },
    { image: './main-slider/img3.avif' },
    { image: './main-slider/img4.avif' },
    { image: './main-slider/img5.avif' },
    { image: './main-slider/img6.avif' },
    { image: './main-slider/img7.avif' },
    { image: './main-slider/img8.avif' },
    { image: './main-slider/img9.avif' },
    { image: './main-slider/img10.avif' },
  ];

  spaceBetween = 10;

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide changed');
  }
}
