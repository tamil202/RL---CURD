import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class capitalizePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
