import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [NavbarComponent, HeaderComponent], //Aquí se declaran los componentes
  imports: [CommonModule, TranslocoModule], //Aquí se exportan módulos exteriores
  exports: [NavbarComponent, HeaderComponent], //Aquí se exportan los componentes
})
export class ComponentsModule {}
