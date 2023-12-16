import { Injectable } from '@angular/core';
import { User } from '../interfaces/app.interface';
import { ApiService } from './api.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logged = new BehaviorSubject<boolean>(false);
  logged$ = this.logged.asObservable();

  user!: User;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  getLoggedValue() {
    return this.logged.getValue();
  }

  setUserLogged(state: boolean) {
    this.logged.next(state);
    if (state === false) {
      localStorage.removeItem('currentUser');
    }
  }

  saveUserToLocalStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
