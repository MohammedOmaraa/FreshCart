import { codeLang } from './../interfaces/language';
import { isPlatformBrowser } from '@angular/common';
import { STORED_KEYS } from './../constants/storedKeys';
import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { Language } from '../interfaces/language';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly AVAILABLE_LANGUAGES: Language[] = [
    { code: 'EN', label: 'English' },
    { code: 'AR', label: 'العربية' },
  ];

  private readonly STORED_KEYS = STORED_KEYS;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly translate = inject(TranslateService);

  private readonly userLangSignal = signal<Language>(this.initialLang());
  userLang = this.userLangSignal.asReadonly();

  sideEffect = effect(() => {
    // userLang
    if (!this.isBrowser) return;

    const langCode = this.userLang().code.toLowerCase();
    localStorage.setItem(STORED_KEYS.settings.language, langCode);
    this.translate.use(langCode);
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
  });

  setLang(code: codeLang): void {
    const newUserLang = this.AVAILABLE_LANGUAGES.find(
      (lang) => lang.code.toLocaleLowerCase() === code.toLocaleLowerCase()
    );

    if (newUserLang) {
      this.userLangSignal.set(newUserLang);
      return;
    }
    // set default lang EN
    this.userLangSignal.set(this.AVAILABLE_LANGUAGES[0]);
  }

  private initialLang(): Language {
    if (!this.isBrowser) {
      return this.AVAILABLE_LANGUAGES[0];
    }

    const savedLang = localStorage.getItem(STORED_KEYS.settings.language);

    const foundLang = this.AVAILABLE_LANGUAGES.find(
      (lang) => lang.code.toLowerCase() === savedLang?.toLowerCase()
    );

    return foundLang ?? this.AVAILABLE_LANGUAGES[0];
  }
}
