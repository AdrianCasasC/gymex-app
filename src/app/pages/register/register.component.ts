import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sex, User } from 'src/app/interfaces/app.interface';
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
    email: '',
    sex: Sex.male,
    password: '',
  };
  repeatedPassword!: string;
  dropdownOptions: string[] = sexOptions;

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

  onSelectedOption(option: string) {
    this.newUser.sex = this.getEnumValueFromString(option);
  }

  private getEnumValueFromString(value: string): Sex {
    const enumValue = Sex[value as keyof typeof Sex];
    return enumValue;
  }
}

export const sexOptions: string[] = [
  'male',
  'female',
  'transgender',
  'intersexual',
  'bisexual',
  'queer',
  'combatHelicopter',
  'terraneitor3000',
  'gokuSuperSaiyan3',
  'superMarioBro',
  'terminator2',
];
