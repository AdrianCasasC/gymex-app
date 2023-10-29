import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RoutineComponent } from './routine/routine.component';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginComponent } from './login/login.component';
import { SelectedRoutineComponent } from './selected-routine/selected-routine.component';
import { AppRoutingModule } from '../app-routing.module';
import { MyRoutinesComponent } from './my-rouitnes/my-routines.component';

@NgModule({
  declarations: [HomeComponent, RoutineComponent, LoginComponent, SelectedRoutineComponent, MyRoutinesComponent], //Aquí se declaran los componentes
  imports: [CommonModule, ComponentsModule, TranslocoModule, FormsModule, AppRoutingModule], //Aquí se exportan módulos exteriores
  exports: [HomeComponent, RoutineComponent, SelectedRoutineComponent, MyRoutinesComponent], //Aquí se exportan los componentes
})
export class PagesModule {}
