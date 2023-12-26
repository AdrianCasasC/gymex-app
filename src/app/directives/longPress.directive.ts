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

  @HostListener('touchstart') onMouseDown() {
    this.isPressing = true;
    setTimeout(() => {
      if (this.isPressing) {
        this.longPress.emit();
      }
    }, 1000);
  }

  @HostListener('touchend') onMouseUp() {
    this.isPressing = false;
  }
}
