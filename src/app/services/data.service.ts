import { Injectable } from '@angular/core';
import {
  MuscularGroups,
  Exercises,
  Exercise,
  Routine,
  Day,
  Week,
} from '../interfaces/app.interface';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export const muscularGroups: MuscularGroups[] = [
  'chest',
  'back',
  'leg',
  'shoulder',
  'arm',
  'abs',
  'basics',
];

export const exercisesByMuscleGroup: Exercises = {
  chestExercises: [
    'inclineBarBenchPress',
    'inclineDumbellBenchPress',
    'dumbellBenchPress',
    'pulleyCrosses',
    'dumbellCrosses',
    'deeps',
  ],
  backExercises: [
    'chestPull',
    'neutralChestPull',
    'supineChestPull',
    'dumbellRow',
    'pulleyRow',
    'pullover',
    'pendleyRow',
    'pullUps',
  ],
  shoulderExercises: [
    'militarPress',
    'dumbellMilitarPress',
    'lateralRaises',
    'frontalRaises',
    'posterior',
  ],
  absExercises: ['wheel', 'pulleyContractions'],
  armExercises: [
    'dumbellBiceps',
    'barBiceps',
    'pulleyBiceps',
    'inclineBiceps',
    'frenchPress',
    'pulleyTriceps',
    'dumbellTriceps',
  ],
  legExercises: [
    'legPress',
    'hiptrust',
    'strides',
    'dumbellDeadlift',
    'stiffLegs',
    'quadExtension',
    'femoralContraction',
    'bulgarianStride',
    'abductor',
    'gluteKick',
    'glutealOpening',
    'calfRaises',
    'nordicCurl',
  ],
  basicsExercises: ['lowBarSquad', 'squad', 'benchPress', 'deadLift'],
};

export const numberOfSeries = [1, 2, 3, 4, 5, 6, 7, 8];
export const daysOfWeek: Day[] = [
  {
    name: 'monday',
    routine: null,
  },
  {
    name: 'tuesday',
    routine: null,
  },
  {
    name: 'wednesday',
    routine: null,
  },
  {
    name: 'thursday',
    routine: null,
  },
  {
    name: 'friday',
    routine: null,
  },
  {
    name: 'saturday',
    routine: null,
  },
  {
    name: 'sunday',
    routine: null,
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private selectedTab$ = new BehaviorSubject<string>('');
  _selectedTab$ = this.selectedTab$.asObservable();
  savedRoutines: Routine[] = [];
  savedWeeks: Week[] = [];

  constructor(private readonly route: ActivatedRoute) {}

  getSelectedTabValue(): string {
    return this.selectedTab$.getValue();
  }

  setTabValue(value: string): void {
    this.selectedTab$.next(value);
  }

  setSavedRoutines(routineName: string, selectedExercises: Exercise[]) {
    const newRoutine: Routine = {
      id: '',
      name: routineName,
      exercises: [...selectedExercises],
      showProperties: false,
    };
    this.savedRoutines.push(newRoutine);
  }

  getSavedRoutines(): Routine[] {
    return this.savedRoutines;
  }

  getRoutineByName(name: string): Routine | undefined {
    return this.savedRoutines.find((routine) => routine.name === name);
  }

  setWeek(newWeek: Week) {
    this.savedWeeks.push(newWeek);
  }

  getWeeks(): Week[] {
    return this.savedWeeks;
  }

  getWeekByName(weekName: string): Week | undefined {
    return this.savedWeeks.find((week) => week.name === weekName);
  }
}
