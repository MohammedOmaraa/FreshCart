import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly shoppingCartIcon = ShoppingCartIcon;

  readonly date = new Date().getFullYear();
}
