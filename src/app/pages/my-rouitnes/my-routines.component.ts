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
import { DataService } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';

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
  randomImage1!: string;
  randomImage2!: string;
  totalRandomImages: number = 7;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly dataService: DataService,
    public readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.updateSelectedNavbar();
    this.getBackendData();
    this.assignRandomImage();
    this.randomImage1 = this.getRandomNumberBetween(
      1,
      this.totalRandomImages
    ).toString();
  }

  updateSelectedNavbar() {
    this.dataService.setTabValue('routine');
  }

  getBackendData() {
    this.apiService.getBackendRoutines().subscribe((response: any) => {
      this.myRoutines = this.mapDateRoutines(response);
      this.myRoutines = this.myRoutines.sort(
        (a: Routine, b: Routine) =>
          a.createdDate!.getTime() - b.createdDate!.getTime()
      );
      this.setDefaultSelectedRoutine();
    });
  }

  assignRandomImage() {
    this.randomImage1 = this.getRandomNumberBetween(1, 4).toString();
    this.randomImage2 = this.getRandomNumberDifferentThan(
      parseInt(this.randomImage1)
    ).toString();
  }

  getRandomNumberDifferentThan(number: number): number {
    const randomNumber = this.getRandomNumberBetween(1, 4);
    if (randomNumber === number) {
      return this.getRandomNumberDifferentThan(number);
    }

    return randomNumber;
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

  addNewRoutine(newRoutineName: string) {
    this.routines.push(newRoutineName);
    this.goToCard(newRoutineName);
  }

  goToCard(selectedRoutine: string) {
    this.router.navigate([`/add/${selectedRoutine}`]);
  }

  editExerciseSeries(exercise: Exercise) {
    this.exerciseToEdit = exercise;
    this.showEditSeriesModal = true;
  }

  saveSeries(selectedNumberOfSeries: number) {
    this.exerciseToEdit.series = [];
    for (let i = 0; i < selectedNumberOfSeries; i++) {
      this.exerciseToEdit.series.push({
        weight: 0,
        reps: 0,
        showLastWeek: false,
        lastWeekCoincidences: [],
      });
    }
    //this.applySavedSeries.emit(this.selectedExercise);

    /* let foundExercise: Exercise | undefined =
      this.selectedRoutine.exercises.find(
        (exercise) => exercise.name === exerciseEdited.name
      ); */

    /* if (foundExercise) {
      foundExercise = { ...exerciseEdited };
    } */

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
    if (this.myRoutines.length === 0) {
      this.asignEmptyRoutine();
    } else if (this.selectedRoutine.id === routineToDelete.id) {
      this.asignDefaultRoutine();
    }
  }

  asignEmptyRoutine() {
    const emptyRoutine: Routine = {
      id: '',
      name: '',
      exercises: [],
      showProperties: false,
    };
    this.selectedRoutine = emptyRoutine;
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

  getRandomNumberBetween(minNumber: number, maxNumber: number): number {
    return Math.floor(Math.random() * maxNumber + minNumber);
  }

  private mapDateRoutines(response: any): Routine[] {
    const mappedRoutines: Routine[] = [];
    response.forEach((databaseRoutine: any) => {
      const mappedRoutine: Routine = { ...databaseRoutine };
      mappedRoutine.createdDate = new Date(mappedRoutine.createdDate!);
      mappedRoutines.push(mappedRoutine);
    });
    return mappedRoutines;
  }
}
