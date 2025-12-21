import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header-title',
  imports: [TranslatePipe],
  templateUrl: './header-title.html',
  styleUrl: './header-title.css',
})
export class HeaderTitle {
  @Input({ required: true }) title: string = '';
}
