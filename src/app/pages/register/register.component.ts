import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sex, User, ValidationError } from 'src/app/interfaces/app.interface';
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
    sex: '',
    password: '',
    confirmPassword: '',
  };
  validationErrors: ValidationError[] = [];
  dropdownOptions: string[] = sexOptions;

  constructor(
    private router: Router,
    private readonly apiService: ApiService
  ) {}

  handleSubmit() {
    this.validationErrors = [];
    this.apiService.register(this.newUser).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (response) => {
        console.log('Error al registrar el usuario', response);
        this.validationErrors = response.error;
        //this.checkPasswords();
      },
    });
  }

  /* checkPasswords(): boolean {
    if (this.newUser.password !== this.repeatedPassword) {
      const repeatedPasswordError: ValidationError = {
        field: 'repeatPassword',
        message:
          'Las contraseñas no coinciden. Por favor, vuelva a intentarlo.',
      };
      this.validationErrors = [...this.validationErrors, repeatedPasswordError];
      return false;
    }
    return true;
  } */

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
