import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-properties-popup',
  templateUrl: './properties-popup.component.html',
  styleUrls: ['./properties-popup.component.scss'],
})
export class PropertiesPopupComponent {
  @Input() properties: string[] = ['Cambiar nombre', 'Eliminar'];

  constructor() {}
}
