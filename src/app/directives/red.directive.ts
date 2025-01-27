import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appRedDirective]',
  standalone: true,
})
export class RedDirective {
  @HostBinding('style.backgroundColor')
  color = 'red'
  get backgroundColor () {
    return this.color
  }

  @HostBinding('style.textTransform')
  textTransform = 'lowercase'
  get textTransformGetter () {
    return this.textTransform
  }

  @HostListener('mouseenter')
  enter() {
    this.color = 'white'
    this.textTransform = 'uppercase'
  }
  @HostListener('mouseleave')
  leave() {
    this.color = 'red'
    this.textTransform = 'lowercase'
  }

 
}
