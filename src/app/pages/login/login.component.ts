import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sex, User } from 'src/app/interfaces/app.interface';
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
    email: '',
    sex: Sex.male,
    password: '',
    confirmPassword: '',
  };
  logError: boolean = false;

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly apiService: ApiService
  ) {}

  handleSubmit() {
    this.apiService
      .getUserByNameAndPassword(this.loggedUser.name, this.loggedUser.password)
      .subscribe({
        next: (response: any) => {
          this.loggedUser = response;
          this.authService.setUser(this.loggedUser);
          this.authService.setUserLogged(true);
          this.authService.saveUserToLocalStorage(this.loggedUser);
          this.router.navigate(['/routine']);
        },
        error: () => {
          this.logError = true;
          setTimeout(() => {
            this.logError = false;
          }, 3000);
        },
      });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
