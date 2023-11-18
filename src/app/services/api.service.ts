import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/config/api-endpoints';
import { Routine, Week } from '../interfaces/app.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserId() {
    return this.authService.getUser().id;
  }

  getBackendRoutines() {
    return this.http.get(API_ENDPOINTS.routines.basic(this.getUserId()));
  }

  postNewRoutine(newRoutine: Routine) {
    return this.http.post(
      API_ENDPOINTS.routines.basic(this.getUserId()),
      newRoutine
    );
  }

  deleteRoutine(routine: Routine) {
    return this.http.delete(
      API_ENDPOINTS.routines.byId(this.getUserId(), routine.id)
    );
  }

  editRoutine(editedRoutine: Routine) {
    return this.http.put(
      API_ENDPOINTS.routines.basic(this.getUserId()),
      editedRoutine
    );
  }

  getBackendWeeks() {
    return this.http.get(API_ENDPOINTS.weeks.basic(this.getUserId()));
  }

  getWeekById(weekId: string) {
    return this.http.get(API_ENDPOINTS.weeks.byId(this.getUserId(), weekId));
  }

  editWeek(editedWeek: Week) {
    return this.http.put(
      API_ENDPOINTS.weeks.basic(this.getUserId()),
      editedWeek
    );
  }

  postNewWeek(newWeek: Week) {
    return this.http.post(API_ENDPOINTS.weeks.basic(this.getUserId()), newWeek);
  }

  deleteWeek(week: Week) {
    return this.http.delete(
      API_ENDPOINTS.weeks.byId(this.getUserId(), week.id)
    );
  }
}
