import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loggedUser: User = {
    id: '',
    name: '',
    password: '',
  };

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) {}

  handleSubmit() {
    this.apiService
      .getUserByNameAndPassword(this.loggedUser.name, this.loggedUser.password)
      .subscribe({
        next: () => {
          this.authService.setUser(this.loggedUser);
          this.authService.setUserLogged(true);
          this.router.navigate(['/routine']);
        },
        error: () => console.log('Error al loggear al usuario'),
      });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
