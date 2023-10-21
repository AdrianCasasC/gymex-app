import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css'],
})
export class RoutineComponent implements OnInit {
  userName!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUser().name;
  }
}
