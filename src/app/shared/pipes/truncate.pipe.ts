import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength: number, dotsInsideLength: boolean = true): string {
    if (!value) return value;

    value = value.trim();
    if (!value || !maxLength || maxLength < 1 || maxLength > value.length)
      return value;
    return value.substring(0, maxLength - (dotsInsideLength ? 3 : 0)) + '...';
  }

}
