import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Inject Services
  private readonly _AuthServices = inject(AuthServices);

  // Variables
  @Input() isLoggedIn: boolean = false;

  signOut(): void {
    this._AuthServices.signOut();
  }
}
