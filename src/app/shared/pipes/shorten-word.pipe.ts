import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenWords',
})
export class ShortenWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // تقسيم النص إلى كلمات بناءً على المسافات ثم جلب الحرف الأول
    return value
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }
}
