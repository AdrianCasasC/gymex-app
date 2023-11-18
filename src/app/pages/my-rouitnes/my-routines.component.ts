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
  popupRoutine!: Routine;
  editedExerciseIndex!: number;
  selectedSerie!: Serie;
  editedSerieIndex!: number;
  selectedExercise!: Exercise;
  exerciseToEdit!: Exercise;
  showSerieModal: boolean = false;
  showNewRoutineModal: boolean = false;
  showEditSeriesModal: boolean = false;
  showChangeRoutineNameModal: boolean = false;
  saveSuccessfully!: string;
  user!: User;
  routines: string[] = [];

  private popupTimeout: any;

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
    this.apiService.editRoutine(this.selectedRoutine).subscribe({
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

  popupSelectedOption(selectedOption: string, routine: Routine) {
    this.popupRoutine = routine;
    if (selectedOption === 'delete') {
      this.apiService.deleteRoutine(this.popupRoutine).subscribe({
        next: () => this.deleteRoutine(this.popupRoutine),
        error: (error) => console.log(error),
      });
    } else {
      this.showChangeRoutineNameModal = true;
    }
  }

  deleteRoutine(routineToDelete: Routine) {
    this.myRoutines = this.myRoutines.filter(
      (routine) => routine.id !== routineToDelete.id
    );
    if (this.selectedRoutine.id === routineToDelete.id) {
      this.asignDefaultRoutine();
    }
  }

  asignDefaultRoutine() {
    if (this.myRoutines && this.myRoutines.length > 0) {
      this.selectedRoutine = this.myRoutines[0];
    }
  }

  changeRoutineName(newRoutineName: string) {
    const routineToChangeName = this.myRoutines.find(
      (routine) => routine.id === this.popupRoutine.id
    );
    const auxRoutine = this.deepCopy(routineToChangeName);
    auxRoutine.name = newRoutineName;
    this.apiService.editRoutine(auxRoutine).subscribe({
      next: () => {
        routineToChangeName!.name = newRoutineName;
      },
    });
  }

  deepCopy(itemtoCopy: any) {
    return JSON.parse(JSON.stringify(itemtoCopy));
  }

  onMouseDown(selectedRoutine: Routine) {
    this.popupTimeout = setTimeout(() => {
      selectedRoutine.showProperties = true;
    }, 1000);
  }

  onMouseUp() {
    clearTimeout(this.popupTimeout);
  }

  onMouseLeave() {
    clearTimeout(this.popupTimeout);
  }
}
