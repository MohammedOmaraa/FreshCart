import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ToggleTheme } from '../toggle-theme/toggle-theme';
import { ToggleLanguage } from '../toggle-language/toggle-language';
import { ShoppingCartIcon, User, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ToggleTheme,
    ToggleLanguage,
    LucideAngularModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  encapsulation: ViewEncapsulation.None,
})
export class Navbar {
  // Inject Services
  private readonly _AuthServices = inject(AuthServices);

  // Variables
  @Input() isLoggedIn: boolean = false;
  readonly UserIcon = User;
  readonly shoppingCartIcon = ShoppingCartIcon;

  signOut(): void {
    this._AuthServices.signOut();
  }
}
