import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  muscularGroups,
  exercisesByMuscleGroup,
  numberOfSeries,
} from 'src/app/services/data.service';
import { MuscularGroups, Exercise } from 'src/app/interfaces/app.interface';

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
  selectedNumberOfSeries: number = 0;
  chosenExercises: Exercise[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedRoutine =
      this.activatedRoute.snapshot.params['selectedRoutine'];
  }

  addExercise(exerciseName: string, exerciseSeries: number) {
    const pickedExercise: Exercise = {
      name: exerciseName,
      series: exerciseSeries
    }

    this.chosenExercises.push(pickedExercise);

    this.showExerciseModal = false;
    document.body.style.overflow = 'auto';
  }

  handleSelectedCard(exercise: string, muscleGroup: string) {
    this.selectedExercise = 'exercises.' + muscleGroup + '.' + exercise;
    this.showExerciseModal = true
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showExerciseModal = false
    document.body.style.overflow = 'auto';
  }
}
