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

export interface Serie {
  weight: number;
  reps: number;
}

export interface Exercise {
  name: string;
  series: Serie[];
}

export interface Routine {
  name: string;
  exercises: Exercise[];
}

export type MuscularGroups =
  | 'chest'
  | 'back'
  | 'leg'
  | 'shoulder'
  | 'arm'
  | 'abs'
  | 'basics';
