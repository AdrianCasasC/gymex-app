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
  successRegister: boolean = false;
  showConflictmessage: boolean = false;

  constructor(
    private router: Router,
    private readonly apiService: ApiService
  ) {}

  handleSubmit() {
    this.validationErrors = [];
    this.apiService.register(this.newUser).subscribe({
      next: () => {
        this.successRegister = true;
        setTimeout(() => {
          this.successRegister = false;
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (response) => {
        if (response.status === 400) {
          this.validationErrors = response.error;
          return;
        }
        this.showConflictmessage = true;
        setTimeout(() => {
          this.showConflictmessage = false;
        }, 2000);
      },
    });
  }

  onSelectedOption(option: string) {
    this.newUser.sex = this.getEnumValueFromString(option);
  }

  onClickOutside(): void {
    this.showDropdownOptions$.next(false);
  }

  hasFieldError(fieldName: string): boolean {
    switch (fieldName) {
      case 'name':
        if (this.findErrorByField('name')) {
          return true;
        }
        break;
      case 'email':
        if (this.findErrorByField('email')) {
          return true;
        }
        break;
      case 'password':
        if (this.findErrorByField('password')) {
          return true;
        }
        break;
      case 'confirmPassword':
        if (this.findErrorByField('confirmPassword')) {
          return true;
        }
        break;
      default:
        break;
    }
    return false;
  }

  private findErrorByField(fieldName: string): ValidationError | undefined {
    return this.validationErrors.find((error) => error.field === fieldName);
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
