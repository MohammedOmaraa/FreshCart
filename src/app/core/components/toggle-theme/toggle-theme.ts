import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toggle-theme',
  imports: [],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.css',
})
export class ToggleTheme {
  themeService = inject(ThemeService);

  get isDark() {
    return this.themeService.userTheme() == 'dark' ? true : false;
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
}
