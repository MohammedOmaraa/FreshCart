import { Component, forwardRef, input } from '@angular/core';
import { ErrorMessage } from '../error-message/error-message';
import {
  LucideAngularModule,
  LucideIconData,
  Eye,
  EyeOff,
} from 'lucide-angular';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-auth-input',
  imports: [ErrorMessage, LucideAngularModule, KeyValuePipe],
  templateUrl: './auth-input.html',
  styleUrl: './auth-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthInput),
    },
  ],
})
export class AuthInput implements ControlValueAccessor {
  labelForId = input<string>('');
  labelText = input<string>('');
  labelClasses = input<string>('');

  inputType = input<string>('text');
  inputPlaceholder = input<string>('');
  inputIcon = input<LucideIconData>();
  inputClasses = input<string>('');
  control = input<AbstractControl | null>(null);
  controlName = input<string>('');
  errorMessages = input<Record<string, string>>({});
  
  protected isPasswordVisible = false;
  readonly eyeIcon = Eye;
  readonly eyeOffIcon = EyeOff;

  inputValue: string = '';
  disabled: boolean = false;
  onChange = (value: string) => {};
  onTouched = () => {};

  get actualInputType(): string {
    if (this.inputType() !== 'password') {
      return this.inputType();
    }
    return this.isPasswordVisible ? 'text' : 'password';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  writeValue(obj: any): void {
    this.inputValue = obj ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
