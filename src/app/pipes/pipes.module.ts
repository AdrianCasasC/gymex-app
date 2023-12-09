import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe } from './capitalizeFirst';

@NgModule({
  declarations: [CapitalizeFirstPipe], //Aquí se declaran los componentes
  imports: [], //Aquí se exportan módulos exteriores
  exports: [CapitalizeFirstPipe], //Aquí se exportan los componentes
})
export class PipesModule {}
