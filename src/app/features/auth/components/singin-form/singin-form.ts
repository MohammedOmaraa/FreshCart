import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
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
export class SinginForm implements OnInit {
  // Inject Services
  private readonly _AuthServices = inject(AuthServices);
  private readonly _Router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  // Variables
  errorMessage: string | undefined;
  successMessage: string | undefined;
  isLoading: boolean = false;
  signInForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signInForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.handleBeforeSubmit();

    // check is valid form
    if (this.signInForm.valid) {
      this._AuthServices
        .signInUser(this.signInForm.value as ISignInData)
        .subscribe({
          next: (res: ISignInResponse) => this.handleSuccessResponse(res),
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
