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
  lastWeekCoincidences: Coincidence[];
}

export interface Coincidence {
  weekDay: string;
  reps: number;
  weight: number;
}

export interface DaySeriesCoincidence {
  weekDay: string;
  series: SeriesCoincidence[];
}

export interface SeriesCoincidence {
  reps: number;
  weight: number;
}

export interface Exercise {
  name: string;
  series: Serie[];
}

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
  showProperties: boolean;
}

export interface Week {
  id: string;
  name: string;
  showProperties: boolean;
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
