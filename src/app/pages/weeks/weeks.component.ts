import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Day,
  Exercise,
  Coincidence,
  Routine,
  Serie,
  Week,
  DaySeriesCoincidence,
  SeriesCoincidence,
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
  savedRoutines: Routine[] = [];
  selectedAssociatedRoutine!: Routine;
  selectedExercise!: Exercise;
  selectedSerie!: Serie;
  editedSerieIndex!: number;
  editedExerciseIndex!: number;
  showSerieModal: boolean = false;
  isRoutineSelected: boolean = true;
  showLastWeek: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBackendData();
  }

  getBackendData() {
    this.apiService.getBackendWeeks().subscribe((response: any) => {
      this.myWeeks = response;
      this.asignDefaultWeek();
      this.asignDefaultDay();
    });
  }

  asignDefaultWeek() {
    if (this.myWeeks.length > 0) {
      this.selectedWeek = this.myWeeks[0];
    }
  }

  asignDefaultDay() {
    if (this.selectedWeek) {
      this.selectedDay = this.selectedWeek.days[0];
    }
  }

  addNewWeek(weekName: string) {
    const newWeek: Week = {
      id: '',
      name: weekName,
      days: this.daysOfWeek,
    };

    this.apiService.postNewWeek(newWeek).subscribe({
      next: (response: any) => {
        newWeek.id = response[response.length - 1].id;
        this.myWeeks.push(newWeek);
        this.selectedWeek = newWeek;
        this.selectedDay = this.selectedWeek.days[0];
      },
    });
  }

  selectWeekDay(day: Day) {
    this.selectedDay = day;
  }

  applyChanges() {
    const weekWitheditedDaySeries: Week = JSON.parse(
      JSON.stringify(
        this.myWeeks.find((week) => week.id === this.selectedWeek.id)
      )
    );
    const editedDay = weekWitheditedDaySeries.days.find(
      (day) => day.name === this.selectedDay.name
    );
    editedDay?.routine &&
      (editedDay.routine.exercises[this.editedExerciseIndex].series[
        this.editedSerieIndex
      ] = { ...this.selectedSerie });

    this.apiService.editWeek(weekWitheditedDaySeries).subscribe({
      next: () => {
        this.updateSelectedWeekAndDay(weekWitheditedDaySeries);
        this.updateSelectedDayFromWeek(weekWitheditedDaySeries);
      },
    });
    this.closeModal();
  }

  updateSelectedWeekAndDay(newWeek: Week) {
    const foundWeek = this.myWeeks.find(
      (week) => week.id === this.selectedWeek.id
    );
    if (foundWeek) {
      foundWeek.days = newWeek.days;
    }
  }

  updateSelectedDayFromWeek(week: Week) {
    this.selectedDay = this.getDayByName(week.days)!;
  }

  openRoutinesModal() {
    if (this.savedRoutines.length === 0) {
      this.apiService.getBackendRoutines().subscribe((routines: any) => {
        this.savedRoutines = routines;
        this.showRoutinesModal = true;
      });
    } else {
      this.showRoutinesModal = true;
    }
  }

  associateRoutine(routine: Routine) {
    if (!routine) {
      this.isRoutineSelected = false;
    } else {
      let foundDay: Day | undefined;
      this.getDatabaseSelectedWeek().subscribe({
        next: (response: any) => {
          const actualWeek: Week = response;
          foundDay = this.getDayByName(actualWeek.days);
          if (foundDay) {
            routine.exercises.forEach((exercise) =>
              this.addLastWeekSeries(exercise)
            );
            console.log('Rutina con series de la semana pasada = ', routine);
            foundDay.routine = JSON.parse(JSON.stringify(routine)); //Copia profunda
            this.apiService.editWeek(actualWeek).subscribe({
              next: () => {
                this.updateSelectedWeekAndDay(actualWeek);
                this.updateSelectedDayFromWeek(actualWeek);
              },
            });
          }
        },
      });
      this.showRoutinesModal = false;
    }
  }

  addLastWeekSeries(exerciseToCompare: Exercise) {
    const indexOfPreviousWeek: number =
      this.myWeeks.findIndex((week) => week.id === this.selectedWeek.id) - 1;
    const previousWeek: Week = this.myWeeks[indexOfPreviousWeek];
    const coincidences: DaySeriesCoincidence[] = [];

    previousWeek.days.forEach((day) => {
      day.routine?.exercises.forEach((exercise) => {
        if (exercise.name === exerciseToCompare.name) {
          const coincidenceSeries: SeriesCoincidence[] = [];
          exercise.series.forEach((serie: Serie) => {
            coincidenceSeries.push({
              reps: serie.reps,
              weight: serie.weight,
            });
          });
          coincidences.push({
            weekDay: day.name,
            series: coincidenceSeries,
          });
        }
      });
    });

    exerciseToCompare.series.forEach((serie: Serie, i: number) => {
      serie.lastWeekCoincidences = [];
      coincidences.forEach((coincidence) => {
        serie.lastWeekCoincidences.push({
          weekDay: coincidence.weekDay,
          reps: coincidence.series[i].reps,
          weight: coincidence.series[i].weight,
        });
      });
    });
  }

  existSomeLastWeekRegister(lastWeekSeries: Coincidence[]) {
    return !!lastWeekSeries.find(
      (series) => series.reps != 0 && series.weight != 0
    );
  }

  getDayByName(days: Day[]): Day | undefined {
    return days.find((day: Day) => day.name === this.selectedDay.name);
  }

  getDatabaseSelectedWeek() {
    return this.apiService.getWeekById(this.selectedWeek.id);
  }

  goToRoutines() {
    this.router.navigate(['/routine']);
  }

  copySerie(serie: Serie) {
    this.selectedSerie = JSON.parse(JSON.stringify(serie));
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

  selectWeek(week: Week) {
    this.selectedWeek = JSON.parse(JSON.stringify(week));
    this.asignDefaultDay();
  }

  areEqualObjects(object1: any, object2: any) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }
}
