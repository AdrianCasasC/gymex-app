import { Injectable } from '@angular/core';
import { User } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = {
    id: 'id1',
    name: 'Adri',
    email: 'adri@gmail.com',
  };

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
