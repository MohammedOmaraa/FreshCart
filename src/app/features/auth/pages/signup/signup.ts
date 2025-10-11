import { Component } from '@angular/core';
import { SingupForm } from '../../components/singup-form/singup-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [SingupForm, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {}
