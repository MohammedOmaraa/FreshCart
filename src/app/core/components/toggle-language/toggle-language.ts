import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { codeLang } from '../../interfaces/language';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Globe, ChevronDown, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-toggle-language',
  imports: [MatSelectModule, MatFormFieldModule, LucideAngularModule],
  templateUrl: './toggle-language.html',
  styleUrl: './toggle-language.css',
})
export class ToggleLanguage {
  readonly languageService = inject(LanguageService);
  selected = this.languageService.userLang().code;
  availableLanguages = this.languageService.AVAILABLE_LANGUAGES;
  globeIcon = Globe;
  chevronDownIcon = ChevronDown;

  get lang() {
    return this.languageService.userLang().code;
  }

  changeLang(lang: codeLang): void {
    this.languageService.setLang(lang);
  }
}
