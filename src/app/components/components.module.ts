import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RoutineModalComponent } from './routine-modal/routine-modal.component';
import { FormsModule } from '@angular/forms';
import { SeriesModalComponent } from './series-modal/series-modal.component';
import { SaveModalComponent } from './save-modal/save-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    RoutineModalComponent,
    SeriesModalComponent,
    SaveModalComponent,
  ], //Aquí se declaran los componentes
  imports: [CommonModule, TranslocoModule, FormsModule], //Aquí se exportan módulos exteriores
  exports: [
    NavbarComponent,
    HeaderComponent,
    RoutineModalComponent,
    SeriesModalComponent,
    SaveModalComponent,
  ], //Aquí se exportan los componentes
})
export class ComponentsModule {}
