import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';

@Component({
  selector: 'app-form-field',
  imports: [KeyValuePipe, ErrorMessage],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
  labelForId = input<string>('');
  labelText = input<string>('');
  labelClasses = input<string>('');

  control = input<AbstractControl | null>(null);
  controlName = input<string>('');
  errorMessages = input<Record<string, string>>({});
}
