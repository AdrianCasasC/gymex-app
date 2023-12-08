import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUser: User = {
    id: '',
    name: '',
    password: '',
  };

  constructor(
    private router: Router,
    private readonly apiService: ApiService
  ) {}

  handleSubmit() {
    this.apiService.register(this.newUser).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => console.log('Error al registrar el usuario'),
    });
  }
}
