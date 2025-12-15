import { isPlatformBrowser } from '@angular/common';
import { STORED_KEYS } from './../constants/storedKeys';
import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  STORED_KEYS = STORED_KEYS;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly userThemeSignal = signal<Theme>(this.initialTheme());
  userTheme = this.userThemeSignal.asReadonly();

  sideEffect = effect(() => {
    if (!this.isBrowser) return;

    if (this.userTheme() == 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(this.STORED_KEYS.settings.theme, this.userTheme());
  });

  toggleTheme() {
    const newUserTheme = this.userThemeSignal() == 'light' ? 'dark' : 'light';
    this.userThemeSignal.set(newUserTheme);
  }

  private initialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }

    const savedTheme =
      (localStorage.getItem(STORED_KEYS.settings.theme) as Theme) ?? 'light';

    return savedTheme;
  }
}
