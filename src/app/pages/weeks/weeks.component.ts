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
import { exerciseImagesLinks } from 'src/assets/imagesLinks/standar';
import { DataService } from 'src/app/services/data.service';
import { daysOfWeek } from 'src/app/services/data.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.scss'],
})
export class WeeksComponent implements OnInit {
  myWeeks: Week[] = [];
  selectedWeek!: Week | null;
  popupWeek!: Week;
  selectedDay!: Day | null;
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
  showWeekModal: boolean = false;
  showWeekPropertiesModal: boolean = false;
  showChangeWeekNameModal: boolean = false;
  exerciseImagesLinks = exerciseImagesLinks;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly dataService: DataService,
    public readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.updateSelectedNavbar();
    this.getBackendData();
  }

  updateSelectedNavbar() {
    this.dataService.setTabValue('weeks');
  }

  getBackendData() {
    this.apiService.getBackendWeeks().subscribe((response: any) => {
      this.myWeeks = this.mapDateWeeks(response);
      this.myWeeks = this.myWeeks.sort(
        (a: Week, b: Week) =>
          a.createdDate!.getTime() - b.createdDate!.getTime()
      );
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
    } else {
      this.selectedWeek = null;
    }
  }

  asignDefaultDay() {
    if (this.selectedWeek) {
      this.selectedDay = this.selectedWeek.days[0];
      if (this.selectedDay.routine) {
        this.updateRoutineLastWeekSeries(this.selectedDay.routine);
      }
    } else {
      this.selectedDay = null;
    }
  }

  addNewWeek(weekName: string) {
    const newWeek: Week = {
      name: weekName,
      showProperties: false,
      days: this.daysOfWeek,
    };

    this.apiService.postNewWeek(newWeek).subscribe({
      next: (response: any) => {
        newWeek.id = response.id;
        this.myWeeks.push(newWeek);
        this.selectedWeek = newWeek;
        this.selectedDay = this.selectedWeek.days[0];
      },
      error: () => console.log('Ha ocurrido un error'),
    });
  }

  selectWeekDay(day: Day) {
    this.selectedDay = day;

    if (day.routine) {
      this.updateRoutineLastWeekSeries(day.routine); //Se refrescan las series de la semana pasda
    }
  }

  applyChanges() {
    const weekWithEditedDaySeries: Week = JSON.parse(
      JSON.stringify(
        this.myWeeks.find((week) => week.id === this.selectedWeek!.id)
      )
    );
    const editedDay = weekWithEditedDaySeries.days.find(
      (day) => day.name === this.selectedDay!.name
    );
    editedDay?.routine &&
      (editedDay.routine.exercises[this.editedExerciseIndex].series[
        this.editedSerieIndex
      ] = { ...this.selectedSerie });

    this.apiService.editWeek(weekWithEditedDaySeries).subscribe({
      next: () => {
        this.updateSelectedWeek(weekWithEditedDaySeries);
        this.updateSelectedDayFromWeek(weekWithEditedDaySeries);
      },
    });
    this.closeModal();
  }

  updateSelectedWeek(newWeek: Week) {
    const foundWeek = this.myWeeks.find(
      (week) => week.id === this.selectedWeek!.id
    );
    if (foundWeek) {
      foundWeek.days = this.deepCopy(newWeek.days);
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

  onAssociateRoutine(routine: Routine | null) {
    if (!routine) {
      this.isRoutineSelected = false;
    } else {
      let foundDay: Day | undefined;

      this.getDatabaseSelectedWeek().subscribe({
        next: (response: any) => {
          const actualWeek: Week = response;
          foundDay = this.getDayByName(actualWeek.days);
          if (foundDay) {
            const dayRoutine: Routine = {
              name: routine.name,
              exercises: routine.exercises,
              showProperties: false,
            };
            this.associateDayRoutine(foundDay, dayRoutine, actualWeek);
          }
        },
      });
      this.closeAssociateRoutineModal();
    }
  }

  associateDayRoutine(day: Day, routine: Routine, actualWeek: Week) {
    this.apiService.associateDayRoutine(day.id!, routine).subscribe({
      next: () => {
        this.updateRoutineLastWeekSeries(routine);
        day.routine = this.deepCopy(routine);
        this.updateDatabaseWeek(actualWeek);
      },
      error: () => console.log('Ha habido un error al asociar la rutina'),
    });
  }

  onDesassociateRoutine() {
    let foundDay: Day | undefined;
    this.getDatabaseSelectedWeek().subscribe({
      next: (response: any) => {
        const actualWeek: Week = response;
        foundDay = this.getDayByName(actualWeek.days);
        if (foundDay) {
          this.desassociateDayRoutine(foundDay, actualWeek);
        }
      },
    });
  }

  desassociateDayRoutine(day: Day, actualWeek: Week) {
    this.apiService.desAssociateDayRoutine(day.id!).subscribe({
      next: (response: any) => {
        const actualDay = actualWeek.days.find((day) => day.id === response.id);
        if (actualDay) {
          actualDay.routine = null;
        }
        this.updateDatabaseWeek(actualWeek);
      },
      error: () => console.log('Ha habido un error al desasociar la rutina'),
    });
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
      this.myWeeks.findIndex((week) => week.id === this.selectedWeek!.id) - 1
    );
  }

  addLastWeeKSeries(exerciseToCompare: Exercise, indexOfPreviousWeek: number) {
    const previousWeek: Week = this.myWeeks[indexOfPreviousWeek];
    let coincidences: DaySeriesCoincidence[] = [];

    previousWeek.days.forEach((day) => {
      if (day.routine) {
        const coincidenceExercise = this.searchCoincidenceExerciseInRoutine(
          day.routine!,
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
        if (i <= coincidence.series.length - 1) {
          serie.lastWeekCoincidences.push({
            weekDay: coincidence.weekDay,
            reps: coincidence.series[i].reps,
            weight: coincidence.series[i].weight,
          });
        }
      });
    });
  }

  updateDatabaseWeek(week: Week) {
    this.apiService.editWeek(week).subscribe({
      next: (response) => {
        this.updateSelectedWeek(week);
        this.updateSelectedDayFromWeek(week);
      },
      error: (response) =>
        console.log(
          'Ha ocurrido un error al editar la semana: ',
          response.message
        ),
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
    if (this.selectedWeek!.id === weekToDelete.id) {
      this.asignDefaultWeekAndDay();
    }
  }

  changeWeekName(newWeekName: string) {
    const weekToChangeName = this.myWeeks.find(
      (week) => week.id === this.popupWeek.id
    );
    const auxWeek = this.deepCopy(weekToChangeName);
    auxWeek.name = newWeekName;
    this.apiService.editWeek(auxWeek).subscribe({
      next: () => {
        weekToChangeName!.name = newWeekName;
      },
    });
  }

  existSomeLastWeekRegister(lastWeekSeries: Coincidence[]) {
    return !!lastWeekSeries.find(
      (series) => series.reps != 0 && series.weight != 0
    );
  }

  getDayByName(days: Day[]): Day | undefined {
    return days.find((day: Day) => day.name === this.selectedDay?.name);
  }

  getDatabaseSelectedWeek() {
    return this.apiService.getWeekById(this.selectedWeek!.id!);
  }

  goToRoutines() {
    this.router.navigate(['/routine']);
  }

  copySerie(serie: Serie) {
    this.selectedSerie = this.deepCopy(serie);
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
    this.isRoutineSelected = true;
    this.showRoutinesModal = false;
    this.selectedAssociatedRoutine = null;
  }

  selectWeek(week: Week) {
    this.selectedWeek = this.deepCopy(week);
    this.asignDefaultDay();
  }

  areEqualObjects(object1: any, object2: any) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  onLongPress(week: Week) {
    week.showProperties = true;
  }

  private deepCopy(itemtoCopy: any) {
    return JSON.parse(JSON.stringify(itemtoCopy));
  }

  private mapDateWeeks(response: any): Week[] {
    const mappedWeeks: Week[] = [];
    response.forEach((databaseWeek: any) => {
      const mappedWeek: Week = { ...databaseWeek };
      mappedWeek.createdDate = new Date(databaseWeek.createdDate);
      mappedWeeks.push(mappedWeek);
    });
    return mappedWeeks;
  }
}
