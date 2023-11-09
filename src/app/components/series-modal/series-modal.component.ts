import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from 'src/app/interfaces/app.interface';

import { numberOfSeries } from 'src/app/services/data.service';

@Component({
  selector: 'app-series-modal',
  templateUrl: './series-modal.component.html',
  styleUrls: ['./series-modal.component.scss'],
})
export class SeriesModalComponent {
  @Input() exercise!: Exercise;
  @Output() closeModal = new EventEmitter();
  @Output() applySavedSeries = new EventEmitter();

  numberOfSeries: number[] = numberOfSeries;
  selectedNumberOfSeries!: number;

  constructor() {}

  saveSeries() {
    this.exercise.series = new Array(this.selectedNumberOfSeries);
    this.applySavedSeries.emit(this.exercise);
  }
}
