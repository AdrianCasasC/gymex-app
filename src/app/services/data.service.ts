import { Injectable } from '@angular/core';

export const muscularGroups = ['chest', 'back', 'leg', 'shoulder', 'arm', 'abdomen', 'basics'];

export const chestExercises = [
  'inclineBarBenchPress', 
  'inclineDumbellBenchPress', 
  'dumbellBenchPress',
  'pulleyCrosses',
  'dumbellCrosses'];
  
export const backExercises = [
  'chestPull',
  'neutralChestPull',
  'supineChestPull',
  'dumbellRow',
  'pulleyRow',
  'pullover'
];

export const shoulderExercises = [
  'dumbellMilitarPress',
  'lateralRaises',
  'frontalRaises',
  'posterior'
];

export const absExercises = [
  'wheel',
  'pulleyContractions'
];

export const armExercices = [
  'dumbellBiceps',
  'barBiceps',
  'pulleyBiceps',
  'inclineBiceps',
  'frenchPress',
  'pulleyTriceps',
  'dumbellTriceps',
]

export const legExercises = [
  'legPress',
  'hiptrust',
  'strides',
  'dumbellDeadlift',
  'stiffLegs',
  'quadExtension',
  'femoralContraction'
];

export const basicExercises = [
  'squad',
  'benchPress',
  'deadLift'
];

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
