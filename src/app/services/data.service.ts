import { Injectable } from '@angular/core';
import {
  MuscularGroups,
  Exercises,
  Exercise,
  Routine,
  Day,
  Week,
} from '../interfaces/app.interface';

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
  ],
  backExercises: [
    'chestPull',
    'neutralChestPull',
    'supineChestPull',
    'dumbellRow',
    'pulleyRow',
    'pullover',
  ],
  shoulderExercises: [
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
  ],
  basicsExercises: ['squad', 'benchPress', 'deadLift'],
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
  savedRoutines: Routine[] = [];
  savedWeeks: Week[] = [];

  constructor() {}

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
