import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';
import { interval, Subscription, take } from 'rxjs';
import { AuthServices } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ISignUpData, ISignUpResponse } from '../../interfaces/ISignUpUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './singup-form.html',
  styleUrl: './singup-form.css',
})
export class SingupForm {
  // Inject Services
  private readonly _AuthServices = inject(AuthServices);
  private readonly _Router = inject(Router);

  // Variables
  errorMessage: string | undefined;
  successMessage: string | undefined;
  isLoading: boolean = false;
  timer: number = 3;
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.signUpForm.get('password')?.valueChanges.subscribe(() => {
        this.checkPasswordMatch();
      })
    );
    this.subscriptions.add(
      this.signUpForm.get('rePassword')?.valueChanges.subscribe(() => {
        this.checkPasswordMatch();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  signUpForm = new FormGroup({
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
    const password = this.signUpForm.get('password')?.value;
    const rePasswordControl = this.signUpForm.get('rePassword');
    const rePassword = rePasswordControl?.value;

    if (!rePassword || !password) {
      return;
    }
    password !== rePassword
      ? rePasswordControl.setErrors({ missMatch: true })
      : rePasswordControl.setErrors(null);
  }

  onSubmit() {
    this.handleBeforeSubmit();

    // check is valid form
    if (this.signUpForm.valid) {
      this._AuthServices
        .signUpUser(this.signUpForm.value as ISignUpData)
        .subscribe({
          next: (res: ISignUpResponse) => this.handleSuccessResponse(res),
          error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
        });
    }
  }

  handleBeforeSubmit(): void {
    this.signUpForm.markAllAsTouched();
    this.successMessage = undefined;
    this.errorMessage = undefined;
    this.isLoading = true;
  }

  handleSuccessResponse(res: ISignUpResponse): void {
    this.signUpForm.reset();
    this.successMessage = res.message;
    this.isLoading = false;

    interval(1000)
      .pipe(take(3))
      .subscribe(() => {
        this.timer--;
        if (this.timer == 0) {
          this._Router.navigateByUrl('/signin');
        }
      });
  }

  handleErrorResponse(err: HttpErrorResponse): void {
    this.errorMessage = err.error.message;
    this.isLoading = false;
  }
}
