import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { timer } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ISignInData, ISignInResponse } from '../../interfaces/ISignInUser';
import { toast } from 'ngx-sonner';
import { AuthServices } from '../../services/auth.service';
import { Mail, LockKeyhole, LucideAngularModule } from 'lucide-angular';
import { Input } from '../../../../shared/components/input/input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-singin-form',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    Input,
    RouterLink,
    TranslatePipe,
  ],
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
  readonly mailIcon = Mail;
  readonly lockKeyholeIcon = LockKeyhole;

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

  handleSuccessResponse(res: ISignInResponse) {
    this.signInForm.reset();
    this.successMessage = res.message;
    this.isLoading = false;
    this._AuthServices.saveToken(res.token);
    this._AuthServices.verifyToken().subscribe({
      next: () => {
        toast.success('Login successful!');
        timer(1000).subscribe(() => this._Router.navigateByUrl('/home'));
      },
      error: (err: { message: string }) => toast.error(err.message),
    });
  }

  handleErrorResponse(err: HttpErrorResponse): void {
    this.errorMessage = err.error.message;
    this.isLoading = false;
  }
}
