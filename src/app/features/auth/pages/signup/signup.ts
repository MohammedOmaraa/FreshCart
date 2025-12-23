import { Component } from '@angular/core';
import { SingupForm } from '../../components/singup-form/singup-form';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  imports: [SingupForm, TranslatePipe],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {}
