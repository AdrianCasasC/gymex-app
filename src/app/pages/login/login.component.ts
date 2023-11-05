import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/app.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loggedUser: User = {
    id: '',
    name: '',
    email: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  handleSubmit() {
    this.authService.setUser(this.loggedUser);
    this.router.navigate(['/routine']);
  }
}
