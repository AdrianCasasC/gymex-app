import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Day, Routine, Week } from 'src/app/interfaces/app.interface';
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

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.myWeeks = [...this.dataService.getWeeks()];
    this.selectedWeek = this.myWeeks[0];
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

  addRoutineToDay() {}

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
    }

    this.showRoutinesModal = false;
  }

  goToRoutines() {
    this.router.navigate(['/routine']);
  }
}
