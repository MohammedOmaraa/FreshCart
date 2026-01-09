import { Component, forwardRef, input } from '@angular/core';
import {
  LucideAngularModule,
  LucideIconData,
  Eye,
  EyeOff,
} from 'lucide-angular';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField } from '../form-field/form-field';
import { BaseControl } from '../../directives/base-control';

@Component({
  selector: 'app-input',
  imports: [LucideAngularModule, FormField],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Input),
    },
  ],
})
export class Input extends BaseControl<string> {
  type = input<'text' | 'password' | 'email'>('text');
  labelForId = input<string>('');
  labelText = input<string>('');
  protected isPasswordVisible = false;
  readonly eyeIcon = Eye;
  readonly eyeOffIcon = EyeOff;
  placeholder = input<string>('');
  customClasses = input<string>('');
  icon = input<LucideIconData>();

  get actualInputType(): string {
    if (this.type() !== 'password') {
      return this.type();
    }
    return this.isPasswordVisible ? 'text' : 'password';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
