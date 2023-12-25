import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from 'src/app/interfaces/app.interface';

import { numberOfSeries } from 'src/app/services/data.service';

@Component({
  selector: 'app-series-modal',
  templateUrl: './series-modal.component.html',
  styleUrls: ['./series-modal.component.scss'],
})
export class SeriesModalComponent {
  @Input() selectedExercise!: string;
  @Input() error: boolean = false;
  @Output() closeModal = new EventEmitter();
  @Output() applySavedSeries = new EventEmitter();

  numberOfSeries: number[] = numberOfSeries;
  selectedNumberOfSeries: number = 1;

  constructor() {}

  /* saveSeries() {
    this.selectedExercise.series = [];
    for (let i = 0; i < this.selectedNumberOfSeries; i++) {
      this.selectedExercise.series.push({
        weight: 0,
        reps: 0,
        showLastWeek: false,
        lastWeekCoincidences: [],
      });
    }
    this.applySavedSeries.emit(this.selectedExercise);
  } */

  onCloseModal() {
    this.closeModal.emit();
  }

  onSaveSeries(selectedNumberOfSeries: number) {
    this.applySavedSeries.emit(selectedNumberOfSeries);
  }
}
