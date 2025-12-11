import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { STORED_KEYS } from '../../constants/storedKeys';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Inject Services
  private readonly _AuthServices = inject(AuthServices);
  private readonly translate = inject(TranslateService);
  private readonly PLATFORM = inject(PLATFORM_ID);

  // Variables
  @Input() isLoggedIn: boolean = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.PLATFORM)) {
      if (localStorage.getItem(STORED_KEYS.settings.language)) {
        this.translate.use(
          localStorage.getItem(STORED_KEYS.settings.language)!
        );
      }
    }
  }
  signOut(): void {
    this._AuthServices.signOut();
  }

  toggleLang(lang: string): void {
    localStorage.setItem(STORED_KEYS.settings.language, lang.toLowerCase());
    this.translate.use(lang.toLowerCase());
    document.documentElement.dir = lang.toLowerCase() == 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }
}
