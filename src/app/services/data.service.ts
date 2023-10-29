import { Injectable } from '@angular/core';
import { MuscularGroups, Exercises, Exercise, Routine } from '../interfaces/app.interface';

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

@Injectable({
  providedIn: 'root',
})
export class DataService {
  savedRoutines: Routine[] = [];

  constructor() {}

  setSavedRoutines(routineName: string, selectedExercises: Exercise[]) {
    const newRoutine: Routine = {
      name: routineName,
      exercises: [...selectedExercises]
    }
    this.savedRoutines.push(newRoutine);
  }

  getSavedRoutines(): Routine[] {
    return this.savedRoutines;
  }
}
