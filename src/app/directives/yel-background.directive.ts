import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appYelBackground]',
  standalone: true
})
export class YelBackgroundDirective {
  @HostBinding('style.backgroundColor')
  color = '#f0b94d'

  @HostListener('mouseenter')
  enter() {
    this.color = '#f0b94d'
  }
  @HostListener('mouseleave')
  leave() {
    this.color = '#4b565e'
  }
}
