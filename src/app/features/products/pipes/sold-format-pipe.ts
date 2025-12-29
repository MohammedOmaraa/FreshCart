import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soldFormat'
})
export class SoldFormatPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) {
      return '0';
    }

    if (value > 1e12) {
      return '1M+';
    }

    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + 'B';
    }

    if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + 'M';
    }

    if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + 'K';
    }

    return new Intl.NumberFormat('en-US').format(value);
  }
}
