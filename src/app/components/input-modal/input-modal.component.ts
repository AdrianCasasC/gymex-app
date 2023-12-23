import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss'],
})
export class InputModalComponent {
  @Input() labelText!: string;
  @Output() closeModal = new EventEmitter();
  @Output() writtenText = new EventEmitter();

  text!: string;

  constructor() {}

  handleAddRoutine() {
    if (!this.text) {
      return;
    }
    this.writtenText.emit(this.text);
    this.closeModal.emit();
  }
}
