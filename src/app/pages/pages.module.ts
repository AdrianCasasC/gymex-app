import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectedRoutineComponent } from './selected-routine/selected-routine.component';
import { AppRoutingModule } from '../app-routing.module';
import { MyRoutinesComponent } from './my-rouitnes/my-routines.component';
import { WeeksComponent } from './weeks/weeks.component';
import { PipesModule } from '../pipes/pipes.module';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SelectedRoutineComponent,
    MyRoutinesComponent,
    WeeksComponent,
    RegisterComponent,
  ], //Aquí se declaran los componentes
  imports: [
    CommonModule,
    ComponentsModule,
    TranslocoModule,
    FormsModule,
    AppRoutingModule,
    PipesModule,
    DialogModule,
    ProgressSpinnerModule,
    MatIconModule,
  ], //Aquí se exportan módulos exteriores
  exports: [
    HomeComponent,
    SelectedRoutineComponent,
    MyRoutinesComponent,
    WeeksComponent,
  ], //Aquí se exportan los componentes
})
export class PagesModule {}
