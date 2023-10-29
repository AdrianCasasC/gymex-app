import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css'],
})
export class RoutineComponent implements OnInit {
  userName!: string;
  showNewRoutineModal: boolean = false;
  routines: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUser().name;
  }

  addNewRoutine(newRoutine: string) {
    console.log(newRoutine);
    this.routines.push(newRoutine);
  }

  goToCard(selectedRoutine: string) {
    this.router.navigate([`/add/${selectedRoutine}`]);
  }
}
