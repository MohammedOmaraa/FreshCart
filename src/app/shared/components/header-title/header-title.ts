import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-title',
  imports: [],
  templateUrl: './header-title.html',
  styleUrl: './header-title.css',
})
export class HeaderTitle {
  @Input({ required: true }) title: string = '';
}
