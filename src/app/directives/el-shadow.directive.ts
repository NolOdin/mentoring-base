import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appElShadow]',
  standalone: true,
})
export class ElShadowDirective {
  @HostBinding('style.boxShadow')
  shadow = '0px 20px 50px 0px rgba(60, 60, 59, 0.0705882353)';

  @HostListener('mouseenter')
  enter() {
    this.shadow = '20px -10px 50px 0px rgba(60, 60, 59, 0.0705882353)';
  }
  @HostListener('mouseleave')
  leave() {
    this.shadow = '0px 20px 50px 0px rgba(60, 60, 59, 0.0705882353)';
  }
}
