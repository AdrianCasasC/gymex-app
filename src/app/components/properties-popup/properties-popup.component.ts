import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-properties-popup',
  templateUrl: './properties-popup.component.html',
  styleUrls: ['./properties-popup.component.scss'],
})
export class PropertiesPopupComponent {
  @Input() properties: string[] = ['changeName', 'delete'];
  @Output() selectedOption = new EventEmitter();

  constructor() {}
}
