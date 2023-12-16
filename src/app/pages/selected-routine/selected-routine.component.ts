import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  muscularGroups,
  exercisesByMuscleGroup,
  numberOfSeries,
  DataService,
} from 'src/app/services/data.service';
import {
  MuscularGroups,
  Exercise,
  Serie,
  Routine,
} from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-selected-routine',
  templateUrl: './selected-routine.component.html',
  styleUrls: ['./selected-routine.component.scss'],
})
export class SelectedRoutineComponent implements OnInit {
  selectedRoutineName!: string;
  selectedMuscle: string = 'chest';
  muscularGroups: MuscularGroups[] = muscularGroups;
  exercisesByMuscleGroup: any = exercisesByMuscleGroup;
  selectedMuscleGroup!: string[];
  showExerciseModal: boolean = false;
  numberOfSeries: number[] = numberOfSeries;
  selectedExercise!: string;
  selectedNumberOfSeries: number = 1;
  chosenExercises: Exercise[] = [];
  routineSavedSuccessfully: string = 'DONE';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.selectedRoutineName =
      this.activatedRoute.snapshot.params['selectedRoutine'];
  }

  addExercise(exerciseName: string, exerciseSeries: number) {
    const pickedExercise: Exercise = {
      name: exerciseName,
      series: this.generateSeriesTypeList(exerciseSeries),
      showProperties: false,
    };

    this.chosenExercises.push(pickedExercise);

    this.showExerciseModal = false;
    document.body.style.overflow = 'auto';
  }

  onLongPress(exercise: Exercise) {
    console.log('long presss');
    exercise.showProperties = true;
  }

  generateSeriesTypeList(length: number) {
    const series: Serie[] = [];

    if (length <= 0) {
      return series;
    } else {
      for (let i = 0; i < length; i++) {
        series.push({
          weight: 0,
          reps: 0,
          showLastWeek: false,
          lastWeekCoincidences: [],
        });
      }

      return series;
    }
  }

  handleSelectedCard(exercise: string) {
    this.selectedExercise = exercise;
    this.showExerciseModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showExerciseModal = false;
    document.body.style.overflow = 'auto';
  }

  saveRoutine() {
    const newRoutine: Routine = {
      name: this.selectedRoutineName,
      exercises: this.chosenExercises,
      showProperties: false,
    };
    this.apiService.postNewRoutine(newRoutine).subscribe({
      next: () => this.openModalAndRedirect('OK'),
      error: () => this.openModalAndRedirect('KO'),
    });
  }

  openModalAndRedirect(statusResponse: string) {
    if (statusResponse === 'OK') {
      this.routineSavedSuccessfully = 'OK';
      setTimeout(() => {
        this.routineSavedSuccessfully = 'DONE';
        this.router.navigate(['/routine']);
      }, 1000);
    } else {
      this.routineSavedSuccessfully = 'KO';
      setTimeout(() => {
        this.routineSavedSuccessfully = 'DONE';
        this.router.navigate(['/routine']);
      }, 1000);
    }
  }

  deleteExercise(selectedExercise: Exercise) {
    const foundExercise = this.chosenExercises.find(
      (exercise) => exercise.name === selectedExercise.name
    );
    if (foundExercise) {
      this.chosenExercises = this.chosenExercises.filter(
        (exercise) => exercise.name !== selectedExercise.name
      );
    }
  }
}
