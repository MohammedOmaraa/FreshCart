import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/components/footer/footer';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('FreshCart');

  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
}
