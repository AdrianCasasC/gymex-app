import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-routine-modal',
  templateUrl: './routine-modal.component.html',
  styleUrls: ['./routine-modal.component.css']
})
export class RoutineModalComponent {
  @Input() labelText!: string;
  @Output() closeModal = new EventEmitter();
  @Output() addNewRoutine = new EventEmitter()

  newRoutineName!: string;

  constructor() {}

  handleAddRoutine() {
    this.addNewRoutine.emit(this.newRoutineName);
    this.closeModal.emit();
  }
}
