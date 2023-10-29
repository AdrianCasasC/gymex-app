import { Component, OnInit } from '@angular/core';
import { Exercise, Routine } from 'src/app/interfaces/app.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-routines',
  templateUrl: './my-routines.component.html',
  styleUrls: ['./my-routines.component.scss'],
})
export class MyRoutinesComponent implements OnInit {
  myRoutines: Routine[] = [];
  selectedRoutine!: Routine;
  
  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
      this.myRoutines = this.dataService.getSavedRoutines();
  }

  getArray(length: number): number[] {
    return new Array(length)
  }
}
