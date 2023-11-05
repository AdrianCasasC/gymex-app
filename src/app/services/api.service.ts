import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/config/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBackendRoutines(userId: string) {
    return this.http.get(API_ENDPOINTS.routines(userId));
  }

  getBackendWeeks(userId: string) {
    return this.http.get(API_ENDPOINTS.weeks(userId));
  }
}
