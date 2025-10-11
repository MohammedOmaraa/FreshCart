import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singup-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './singup-form.html',
  styleUrl: './singup-form.css',
})
export class SingupForm {
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.registerForm.get('password')?.valueChanges.subscribe(() => {
        this.checkPasswordMatch();
      })
    );
    this.subscriptions.add(
      this.registerForm.get('rePassword')?.valueChanges.subscribe(() => {
        this.checkPasswordMatch();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  checkPasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const rePasswordControl = this.registerForm.get('rePassword');
    const rePassword = rePasswordControl?.value;

    if (!rePassword || !password) {
      return;
    }
    password !== rePassword
      ? rePasswordControl.setErrors({ missMatch: true })
      : rePasswordControl.setErrors(null);
  }

  register() {
    this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);
  }
}
