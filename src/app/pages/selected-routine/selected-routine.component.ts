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
} from 'src/app/interfaces/app.interface';

@Component({
  selector: 'app-selected-routine',
  templateUrl: './selected-routine.component.html',
  styleUrls: ['./selected-routine.component.scss'],
})
export class SelectedRoutineComponent implements OnInit {
  selectedRoutine!: string;
  selectedMuscle: string = 'chest';
  muscularGroups: MuscularGroups[] = muscularGroups;
  exercisesByMuscleGroup: any = exercisesByMuscleGroup;
  selectedMuscleGroup!: string[];
  showExerciseModal: boolean = false;
  numberOfSeries: number[] = numberOfSeries;
  selectedExercise!: string;
  selectedNumberOfSeries: number = 0;
  chosenExercises: Exercise[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedRoutine =
      this.activatedRoute.snapshot.params['selectedRoutine'];
  }

  addExercise(exerciseName: string, exerciseSeries: number) {
    const pickedExercise: Exercise = {
      name: exerciseName,
      series: this.generateSeriesTypeList(exerciseSeries),
    };

    this.chosenExercises.push(pickedExercise);

    this.showExerciseModal = false;
    document.body.style.overflow = 'auto';
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
        });
      }

      return series;
    }
  }

  handleSelectedCard(exercise: string, muscleGroup: string) {
    this.selectedExercise = 'exercises.' + muscleGroup + '.' + exercise;
    this.showExerciseModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showExerciseModal = false;
    document.body.style.overflow = 'auto';
  }

  saveRoutine() {
    this.dataService.setSavedRoutines(
      this.selectedRoutine,
      this.chosenExercises
    );
    this.router.navigate(['/routine']);
  }
}
