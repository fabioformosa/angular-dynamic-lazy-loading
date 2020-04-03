import { Component, Input } from '@angular/core';

@Component({
  selector: 'goodbye',
  template: `<h3>Goodbye {{name}}!</h3>`,
  styles: [`h3 { font-family: Lato; }`]
})
export class GoodbyeComponent  {
  @Input() name: string;
}
