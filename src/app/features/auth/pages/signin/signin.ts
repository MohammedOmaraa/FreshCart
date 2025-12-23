import { Component } from '@angular/core';
import { SinginForm } from '../../components/singin-form/singin-form';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  imports: [SinginForm, TranslatePipe],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {}
