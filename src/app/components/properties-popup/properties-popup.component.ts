import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-properties-popup',
  templateUrl: './properties-popup.component.html',
  styleUrls: ['./properties-popup.component.scss'],
})
export class PropertiesPopupComponent {
  @Input() properties: string[] = ['changeName', 'delete'];
  @Input() position!: 'top' | 'rigth' | 'bottom' | 'left';
  @Output() selectedOption = new EventEmitter();
  @Output() clickOutsideContent = new EventEmitter();

  constructor() {}

  onClickOutside() {
    this.clickOutsideContent.emit();
  }
}
