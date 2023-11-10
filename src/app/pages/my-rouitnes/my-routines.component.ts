import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Exercise,
  Routine,
  Serie,
  User,
} from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-routines',
  templateUrl: './my-routines.component.html',
  styleUrls: ['./my-routines.component.scss'],
})
export class MyRoutinesComponent implements OnInit {
  myRoutines: Routine[] = [];
  selectedRoutine!: Routine;
  editedExerciseIndex!: number;
  selectedSerie!: Serie;
  editedSerieIndex!: number;
  selectedExercise!: Exercise;
  exerciseToEdit!: Exercise;
  showSerieModal: boolean = false;
  showNewRoutineModal: boolean = false;
  showEditSeriesModal: boolean = false;
  saveSuccessfully!: string;
  user!: User;
  routines: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getBackendData();
  }

  getBackendData() {
    this.apiService.getBackendRoutines().subscribe((response: any) => {
      this.myRoutines = response;
      this.setDefaultSelectedRoutine();
    });
  }

  setDefaultSelectedRoutine() {
    if (this.myRoutines.length > 0) {
      this.selectedRoutine = this.myRoutines[0];
    }
  }

  applyChanges() {
    this.selectedRoutine.exercises[this.editedExerciseIndex].series[
      this.editedSerieIndex
    ] = { ...this.selectedSerie };
    this.closeModal();
  }

  copySerie(serie: Serie) {
    this.selectedSerie = { ...serie };
  }

  saveExerciseAndSerieIndex(exerciseIndex: number, serieIndex: number) {
    this.editedExerciseIndex = exerciseIndex;
    this.editedSerieIndex = serieIndex;
  }

  openModal() {
    document.body.style.overflow = 'hidden';
    this.showSerieModal = true;
  }

  closeModal() {
    document.body.style.overflow = '';
    this.showSerieModal = false;
  }

  addNewRoutine(newRoutine: string) {
    this.routines.push(newRoutine);
    this.goToCard(newRoutine);
  }

  goToCard(selectedRoutine: string) {
    this.router.navigate([`/add/${selectedRoutine}`]);
  }

  editExerciseSeries(exercise: Exercise) {
    this.exerciseToEdit = exercise;
    this.showEditSeriesModal = true;
  }

  saveSeries(exerciseEdited: Exercise) {
    let foundExercise: Exercise | undefined =
      this.selectedRoutine.exercises.find(
        (exercise) => exercise.name === exerciseEdited.name
      );

    if (foundExercise) {
      foundExercise = { ...exerciseEdited };
    }

    this.saveEditedRoutineToBackend();
  }

  saveEditedRoutineToBackend() {
    this.apiService.editRoutineSeries(this.selectedRoutine).subscribe({
      next: () => {
        this.showEditSeriesModal = false;
        this.saveSuccessfully = 'OK';
        setTimeout(() => (this.saveSuccessfully = 'DONE'), 1000);
      },
      error: () => {
        this.saveSuccessfully = 'KO';
      },
    });
  }
}
