import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/config/api-endpoints';
import { Routine, Week } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBackendRoutines(userId: string) {
    return this.http.get(API_ENDPOINTS.routines(userId));
  }

  postNewRoutine(userId: string, newRoutine: Routine) {
    return this.http.post(API_ENDPOINTS.routines(userId), newRoutine);
  }

  getBackendWeeks(userId: string) {
    return this.http.get(API_ENDPOINTS.weeks(userId));
  }

  postNewWeek(userId: string, newWeek: Week) {
    return this.http.post(API_ENDPOINTS.weeks(userId), newWeek);
  }
}
