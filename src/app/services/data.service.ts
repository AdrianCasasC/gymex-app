import { Injectable } from '@angular/core';
import { MuscularGroups, Exercises } from '../interfaces/app.interface';

export const muscularGroups: MuscularGroups[] = ['chest', 'back', 'leg', 'shoulder', 'arm', 'abs', 'basics'];

export const exercisesByMuscleGroup: Exercises = {
  chestExercises: [
    'inclineBarBenchPress', 
    'inclineDumbellBenchPress', 
    'dumbellBenchPress',
    'pulleyCrosses',
    'dumbellCrosses'],
  backExercises: [
    'chestPull',
    'neutralChestPull',
    'supineChestPull',
    'dumbellRow',
    'pulleyRow',
    'pullover'
  ],
  shoulderExercises: [
    'dumbellMilitarPress',
    'lateralRaises',
    'frontalRaises',
    'posterior'
  ],
  absExercises: [
    'wheel',
    'pulleyContractions'
  ],
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
    'femoralContraction'
  ],
  basicsExercises: [
    'squad',
    'benchPress',
    'deadLift'
  ]
}



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
