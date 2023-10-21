import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RoutineComponent } from './routine/routine.component';
import { TranslocoHttpLoader } from '../transloco-loader';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HomeComponent, RoutineComponent, LoginComponent], //Aquí se declaran los componentes
  imports: [CommonModule, ComponentsModule, TranslocoModule, FormsModule], //Aquí se exportan módulos exteriores
  exports: [HomeComponent, RoutineComponent], //Aquí se exportan los componentes
})
export class PagesModule {}
