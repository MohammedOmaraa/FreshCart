import { Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField } from '../form-field/form-field';
import { BaseControl } from '../../directives/base-control';
import {
  LucideAngularModule,
  LucideIconData,
} from 'lucide-angular';
@Component({
  selector: 'app-textarea',
  imports: [FormField, LucideAngularModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Textarea),
    },
  ],
})
export class Textarea extends BaseControl<string> {
  rows = input<number>(4);
  labelForId = input<string>('');
  labelText = input<string>('');
  placeholder = input<string>('');
  customClasses = input<string>('');
  icon = input<LucideIconData>();
}
