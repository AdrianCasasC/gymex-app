export interface User {
  id: string;
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
  showLastWeek: boolean;
}

export interface Exercise {
  name: string;
  series: Serie[];
  lastWeekSeries?: Serie[];
}

export interface Routine {
  name: string;
  exercises: Exercise[];
}

export interface Week {
  id: string;
  name: string;
  days: Day[];
}

export interface Day {
  name: string;
  routine: Routine | null;
}

export type MuscularGroups =
  | 'chest'
  | 'back'
  | 'leg'
  | 'shoulder'
  | 'arm'
  | 'abs'
  | 'basics';
