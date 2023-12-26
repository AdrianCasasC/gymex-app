import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss'],
})
export class SaveModalComponent {
  @Input() label!: string;
  @Input() errorLabel!: string;
  @Input() successfullSave!: boolean;
  @Output() closeModal = new EventEmitter();

  constructor() {}

  onCloseModal() {
    this.closeModal.emit();
  }
}
