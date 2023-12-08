import { Injectable } from '@angular/core';
import { User } from '../interfaces/app.interface';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logged = new Subject<boolean>();
  logged$ = this.logged.asObservable();

  user!: User;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setUserLogged(state: boolean) {
    this.logged.next(state);
  }
}
