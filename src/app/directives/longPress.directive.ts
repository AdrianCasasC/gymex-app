import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[longPress]',
})
export class LongPressDirective {
  @Output() longPress: EventEmitter<void> = new EventEmitter();

  private isPressing: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown') onMouseDown() {
    this.isPressing = true;
    setTimeout(() => {
      if (this.isPressing) {
        this.longPress.emit();
      }
    }, 1000);
  }

  @HostListener('mouseup') onMouseUp() {
    this.isPressing = false;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isPressing = false;
  }
}
