import { Directive, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appBaseControl]',
})
export class BaseControl<T> implements ControlValueAccessor {
  value!: T;
  disabled = false;

  control = input<AbstractControl | null>(null);
  controlName = input<string>('');
  errorMessages = input<Record<string, string>>({});

  onChange = (value: T) => {};
  onTouched = () => {};

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
