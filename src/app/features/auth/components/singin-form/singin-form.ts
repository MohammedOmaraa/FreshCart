import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription, interval, take } from 'rxjs';
import { AuthServices } from '../../services/auth';
import { Router } from '@angular/router';
import { ErrorMessage } from '../error-message/error-message';
import { ISignInData, ISignInResponse } from '../../interfaces/ISignInUser';

@Component({
  selector: 'app-singin-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './singin-form.html',
  styleUrl: './singin-form.css',
})
export class SinginForm {
  // Inject Services
  private readonly _AuthServices = inject(AuthServices);
  private readonly _Router = inject(Router);

  // Variables
  errorMessage: string | undefined;
  successMessage: string | undefined;
  isLoading: boolean = false;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  onSubmit() {
    this.handleBeforeSubmit();

    // check is valid form
    if (this.signInForm.valid) {
      this._AuthServices.signInUser(this.signInForm.value as ISignInData).subscribe({
        next: (res:ISignInResponse) => this.handleSuccessResponse(res),
        error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
      });
    }
  }

  handleBeforeSubmit(): void {
    this.signInForm.markAllAsTouched();
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.isLoading = true;
  }

  handleSuccessResponse(res: ISignInResponse): void {
    this.signInForm.reset();
    this.successMessage = res.message;
    this.isLoading = false;
  }

  handleErrorResponse(err: HttpErrorResponse): void {
    this.errorMessage = err.error.message;
    this.isLoading = false;
  }
}
