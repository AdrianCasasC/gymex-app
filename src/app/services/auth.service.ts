import { Injectable } from '@angular/core';
import { User } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
