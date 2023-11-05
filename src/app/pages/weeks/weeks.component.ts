import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Day,
  Exercise,
  Routine,
  Serie,
  Week,
} from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { daysOfWeek } from 'src/app/services/data.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss'],
})
export class WeeksComponent implements OnInit {
  showWeekModal: boolean = false;
  myWeeks: Week[] = [];
  selectedWeek!: Week;
  selectedDay!: Day;
  daysOfWeek: Day[] = daysOfWeek;
  showRoutinesModal: boolean = false;
  savedRoutines!: Routine[];
  selectedAssociatedRoutine!: Routine;
  selectedExercise!: Exercise;
  selectedSerie!: Serie;
  editedSerieIndex!: number;
  editedExerciseIndex!: number;
  showSerieModal: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    //this.myWeeks = [...this.dataService.getWeeks()];
    this.getBackendData();
  }

  getBackendData() {
    const userId: string = this.authService.getUser().id;
    this.apiService.getBackendWeeks(userId).subscribe((response: any) => {
      this.myWeeks = response;
      this.asignDefaultWeekAndDay();
    });
  }

  asignDefaultWeekAndDay() {
    if (this.myWeeks.length > 0) {
      this.selectedWeek = this.myWeeks[0];
      this.selectedDay = this.selectedWeek.days[0];
    }
  }

  addNewWeek(weekName: string) {
    const newWeek: Week = {
      name: weekName,
      days: this.daysOfWeek,
    };
    this.myWeeks.push(newWeek);
    this.dataService.setWeek(newWeek);
  }

  selectWeekDay(day: Day) {
    this.selectedDay = day;
  }

  applyChanges() {
    this.selectedAssociatedRoutine.exercises[this.editedExerciseIndex].series[
      this.editedSerieIndex
    ] = { ...this.selectedSerie };
    this.closeModal();
  }

  openRoutinesModal() {
    this.savedRoutines = this.dataService.getSavedRoutines();
    this.showRoutinesModal = true;
  }

  associateRoutine(routine: Routine) {
    const foundDay = this.dataService
      .getWeekByName(this.selectedWeek.name)
      ?.days.find((day) => day.name === this.selectedDay.name);
    if (foundDay) {
      foundDay.routine = routine;
      console.log('Rutina asociada-> ', routine);
    }

    this.showRoutinesModal = false;
  }

  goToRoutines() {
    this.router.navigate(['/routine']);
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
}
