import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  muscularGroups,
  exercisesByMuscleGroup,
  numberOfSeries,
} from 'src/app/services/data.service';
import { MuscularGroups } from 'src/app/interfaces/app.interface';

@Component({
  selector: 'app-selected-routine',
  templateUrl: './selected-routine.component.html',
  styleUrls: ['./selected-routine.component.scss'],
})
export class SelectedRoutineComponent implements OnInit {
  selectedRoutine!: string;
  selectedMuscle!: string;
  muscularGroups: MuscularGroups[] = muscularGroups;
  exercisesByMuscleGroup: any = exercisesByMuscleGroup;
  selectedMuscleGroup!: string[];
  showExerciseModal: boolean = false;
  numberOfSeries: number[] = numberOfSeries;
  selectedExercise!: string;
  selectedNumberOfSeries!: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedRoutine =
      this.activatedRoute.snapshot.params['selectedRoutine'];
  }

  addExercise() {
    this.showExerciseModal = false;
  }
}
