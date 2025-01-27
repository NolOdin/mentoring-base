import { Directive, ElementRef, HostListener, inject, Input, input } from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip'

@Directive({
  selector: '[appElTooltip]',
  providers: [MatTooltip],
  standalone: true
})
export class ElTooltipDirective {


  constructor(private elementRef: ElementRef, private tooltip: MatTooltip) { }

 

  @Input('appElTooltip') tooltipText: string = '';

  @HostListener('mouseenter')
  enter() {
    this.tooltip.message = this.tooltipText
    this.tooltip.show()
  }
  @HostListener('mouseleave')
  leave() {
    this.tooltip.hide()
  }

}
