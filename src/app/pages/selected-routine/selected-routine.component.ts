import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  muscularGroups, 
  chestExercises, 
  backExercises, 
  shoulderExercises, 
  legExercises, 
  armExercices, 
  absExercises, 
  basicExercises 
} from 'src/app/services/data.service';

@Component({
  selector: 'app-selected-routine',
  templateUrl: './selected-routine.component.html',
  styleUrls: ['./selected-routine.component.css']
})
export class SelectedRoutineComponent implements OnInit {
  selectedRoutine!: string;
  muscularGroups: string[] = muscularGroups;
  selectedMuscleGroup!: string[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedRoutine = this.activatedRoute.snapshot.params['selectedRoutine'];
  }
}
