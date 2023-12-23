import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { InputModalComponent } from './input-modal/input-modal.component';
import { FormsModule } from '@angular/forms';
import { SeriesModalComponent } from './series-modal/series-modal.component';
import { SaveModalComponent } from './save-modal/save-modal.component';
import { PropertiesPopupComponent } from './properties-popup/properties-popup.component';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { LongPressDirective } from '../directives/longPress.directive';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    InputModalComponent,
    SeriesModalComponent,
    SaveModalComponent,
    PropertiesPopupComponent,
    ClickOutsideDirective,
    LongPressDirective,
    DropdownComponent,
  ], //Aquí se declaran los componentes
  imports: [CommonModule, TranslocoModule, FormsModule, MatIconModule], //Aquí se exportan módulos exteriores
  exports: [
    NavbarComponent,
    HeaderComponent,
    InputModalComponent,
    SeriesModalComponent,
    SaveModalComponent,
    PropertiesPopupComponent,
    ClickOutsideDirective,
    LongPressDirective,
    DropdownComponent,
  ], //Aquí se exportan los componentes
})
export class ComponentsModule {}
