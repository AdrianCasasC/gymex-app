import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise, Routine, Serie } from 'src/app/interfaces/app.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

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
  userName!: string;
  routines: string[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myRoutines = this.dataService.getSavedRoutines();
    this.userName = this.authService.getUser().name;
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
