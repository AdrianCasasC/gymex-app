import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-modal',
  templateUrl: './routine-modal.component.html',
  styleUrls: ['./routine-modal.component.scss'],
})
export class RoutineModalComponent {
  @Input() labelText!: string;
  @Output() closeModal = new EventEmitter();
  @Output() writtenText = new EventEmitter();

  text!: string;

  constructor() {}

  handleAddRoutine() {
    this.writtenText.emit(this.text);
    this.closeModal.emit();
  }
}
