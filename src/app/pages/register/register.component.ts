import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Sex, User, ValidationError } from 'src/app/interfaces/app.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  showDropdownOptions$ = new BehaviorSubject<boolean>(false);
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
      },
    });
  }

  onSelectedOption(option: string) {
    this.newUser.sex = this.getEnumValueFromString(option);
  }

  onClickOutside(): void {
    this.showDropdownOptions$.next(false);
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
