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
  popupWeek!: Week;
  selectedDay!: Day;
  daysOfWeek: Day[] = daysOfWeek;
  showRoutinesModal: boolean = false;
  savedRoutines: Routine[] = [];
  selectedAssociatedRoutine!: Routine | null;
  selectedExercise!: Exercise;
  selectedSerie!: Serie;
  editedSerieIndex!: number;
  editedExerciseIndex!: number;
  showSerieModal: boolean = false;
  isRoutineSelected: boolean = true;
  showLastWeek: boolean = false;
  showChangeWeekNameModal: boolean = false;

  private popupTimeout: any;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBackendData();
  }

  getBackendData() {
    this.apiService.getBackendWeeks().subscribe((response: any) => {
      this.myWeeks = response;
      this.asignDefaultWeekAndDay();
    });
  }

  asignDefaultWeekAndDay() {
    this.asignDefaultWeek();
    this.asignDefaultDay();
  }

  asignDefaultWeek() {
    if (this.myWeeks.length > 0) {
      this.selectedWeek = this.myWeeks[0];
    }
  }

  asignDefaultDay() {
    if (this.selectedWeek) {
      this.selectedDay = this.selectedWeek.days[0];
      if (this.selectedDay.routine) {
        this.updateRoutineLastWeekSeries(this.selectedDay.routine);
      }
    }
  }

  addNewWeek(weekName: string) {
    const newWeek: Week = {
      id: '',
      name: weekName,
      showProperties: false,
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

    if (day.routine) {
      this.updateRoutineLastWeekSeries(day.routine); //Se refrescan las series de la semana pasda
    }
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
        this.updateSelectedWeek(weekWitheditedDaySeries);
        this.updateSelectedDayFromWeek(weekWitheditedDaySeries);
      },
    });
    this.closeModal();
  }

  updateSelectedWeek(newWeek: Week) {
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

  associateRoutine(routine: Routine | null) {
    if (!routine) {
      this.isRoutineSelected = false;
    } else {
      let foundDay: Day | undefined;

      this.getDatabaseSelectedWeek().subscribe({
        next: (response: any) => {
          const actualWeek: Week = response;
          foundDay = this.getDayByName(actualWeek.days);
          if (foundDay) {
            this.updateRoutineLastWeekSeries(routine);
            foundDay.routine = JSON.parse(JSON.stringify(routine)); //Copia profunda
            this.updateDatabaseWeek(actualWeek);
          }
        },
      });
      this.closeAssociateRoutineModal();
    }
  }

  updateRoutineLastWeekSeries(routine: Routine) {
    routine.exercises.forEach((exercise) => {
      const indexOfPreviousWeek: number = this.findPreviousWeekIndex();

      if (indexOfPreviousWeek >= 0) {
        this.addLastWeeKSeries(exercise, indexOfPreviousWeek);
      }
    });
  }

  findPreviousWeekIndex(): number {
    return (
      this.myWeeks.findIndex((week) => week.id === this.selectedWeek.id) - 1
    );
  }

  addLastWeeKSeries(exerciseToCompare: Exercise, indexOfPreviousWeek: number) {
    const previousWeek: Week = this.myWeeks[indexOfPreviousWeek];
    let coincidences: DaySeriesCoincidence[] = [];

    previousWeek.days.forEach((day) => {
      if (day.routine) {
        const coincidenceExercise = this.searchCoincidenceExerciseInRoutine(
          day.routine,
          exerciseToCompare
        );
        if (coincidenceExercise) {
          coincidences.push(
            this.addAllCoincidenceSeries(coincidenceExercise, day)
          );
        }
      }
    });

    this.addLastWeekCoincidences(exerciseToCompare, coincidences);
  }

  searchCoincidenceExerciseInRoutine(
    routine: Routine,
    exerciseToSearch: Exercise
  ): Exercise | undefined {
    return routine.exercises.find(
      (exercise: Exercise) => exercise.name === exerciseToSearch.name
    );
  }

  addAllCoincidenceSeries(exercise: Exercise, day: Day): DaySeriesCoincidence {
    let coincidence: DaySeriesCoincidence;
    const coincidenceSeries: SeriesCoincidence[] = [];

    exercise.series.forEach((serie: Serie) => {
      coincidenceSeries.push({
        reps: serie.reps,
        weight: serie.weight,
      });
    });

    coincidence = {
      weekDay: day.name,
      series: coincidenceSeries,
    };
    return coincidence;
  }

  addLastWeekCoincidences(
    exercise: Exercise,
    coincidences: DaySeriesCoincidence[]
  ) {
    exercise.series.forEach((serie: Serie, i: number) => {
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

  updateDatabaseWeek(week: Week) {
    this.apiService.editWeek(week).subscribe({
      next: () => {
        this.updateSelectedWeek(week);
        this.updateSelectedDayFromWeek(week);
      },
    });
  }

  popupSelectedOption(selectedOption: string, week: Week) {
    this.popupWeek = week;
    if (selectedOption === 'delete') {
      this.apiService.deleteWeek(this.popupWeek).subscribe({
        next: () => this.deleteWeek(this.popupWeek),
        error: (error) => console.log(error),
      });
    } else {
      this.showChangeWeekNameModal = true;
    }
  }

  deleteWeek(weekToDelete: Week) {
    this.myWeeks = this.myWeeks.filter((week) => week.id !== weekToDelete.id);
    if (this.selectedWeek.id === weekToDelete.id) {
      this.asignDefaultWeekAndDay();
    }
  }

  changeWeekName(newWeekName: string) {
    this.popupWeek.name = newWeekName;
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

  closeAssociateRoutineModal() {
    this.showRoutinesModal = false;
    this.selectedAssociatedRoutine = null;
  }

  selectWeek(week: Week) {
    this.selectedWeek = JSON.parse(JSON.stringify(week));
    this.asignDefaultDay();
  }

  areEqualObjects(object1: any, object2: any) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  onMouseDown(selectedWeek: Week) {
    this.popupTimeout = setTimeout(() => {
      selectedWeek.showProperties = true;
    }, 1000);
  }

  onMouseUp() {
    clearTimeout(this.popupTimeout);
  }

  onMouseLeave() {
    clearTimeout(this.popupTimeout);
  }
}
