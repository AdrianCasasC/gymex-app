import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss'],
})
export class SaveModalComponent {
  @Input() label!: string;
  @Input() successfullSave!: boolean;

  constructor() {}
}
