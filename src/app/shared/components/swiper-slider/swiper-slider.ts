import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  input,
  Input,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { LanguageService } from '../../../core/services/language.service';

register();
@Component({
  selector: 'app-swiper-slider',
  imports: [],
  templateUrl: './swiper-slider.html',
  styleUrl: './swiper-slider.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperSlider {
  private platformId = inject(PLATFORM_ID);
  private languageService = inject(LanguageService);
  isBrowser = isPlatformBrowser(this.platformId);

  data = input<any[]>();
  slidesPerView = input<number>(1);
  spaceBetween = input<number>(20);
  effect = input<'slide' | 'fade' | 'cube' | 'coverflow'>('slide');
  navigation = input<boolean>(true);
  direction = input<'horizontal' | 'vertical'>('horizontal');
  containerClasses = input<string>();
  slideClasses = input<string>();
  defaultBreakpoints = input({
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // Small tablets (≥ 640px)
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    // Tablets (≥ 768px)
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // Small desktop (≥ 1024px)
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    // Large desktop (≥ 1280px)
    1280: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  });

  userLang = this.languageService.userLang;

  // computed direction (RTL/LTR)
  dir = computed(() => (this.userLang().code === 'AR' ? 'rtl' : 'ltr'));
}
