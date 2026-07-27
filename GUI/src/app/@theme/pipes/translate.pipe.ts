import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../providers/i18n.service';

@Pipe({
  name: 't',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18n: I18nService) {}

  transform(key: string, englishFallback?: string): string {
    return this.i18n.fixed(key, englishFallback ?? key);
  }
}
