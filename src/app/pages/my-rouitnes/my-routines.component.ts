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
  showSerieModal: boolean = false;
  showNewRoutineModal: boolean = false;
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
    const userId: string = this.authService.getUser().id;
    this.apiService.getBackendRoutines(userId).subscribe((response: any) => {
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
}
