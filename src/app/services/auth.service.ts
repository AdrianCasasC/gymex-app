import { Injectable } from '@angular/core';
import { User } from '../interfaces/app.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = {
    id: 'id1',
    name: 'Adri',
    password: '1234',
  };

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
