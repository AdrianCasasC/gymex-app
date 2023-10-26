export interface User {
  name: string;
  email: string;
}

export interface Exercises {
  chestExercises: string[];
  backExercises: string[];
  shoulderExercises: string[];
  absExercises: string[];
  armExercises: string[];
  legExercises: string[];
  basicsExercises: string[];
}

export type MuscularGroups = 'chest' | 'back' | 'leg' | 'shoulder' | 'arm' | 'abs' | 'basics';