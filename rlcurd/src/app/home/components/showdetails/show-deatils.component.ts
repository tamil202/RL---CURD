import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'show',
  templateUrl: './show-details.component.html',
})
export class showDetails {
  @Input()
  age = ''
  @Input()
  name = ''
}
