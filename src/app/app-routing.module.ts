import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoutineComponent } from './pages/routine/routine.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectedRoutineComponent } from './pages/selected-routine/selected-routine.component';
import { MyRoutinesComponent } from './pages/my-rouitnes/my-routines.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'series', component: RoutineComponent },
  /*{ path: 'routine', title: 'routine', component: RoutineComponent, children: [{
    path: ':selectedRoutine', title: 'selectedRoutine', component: SelectedRoutineComponent
  }]},*/
  { path: 'routine', title: 'routine', component: MyRoutinesComponent},
  //{ path: 'routine/:selectedRoutine', title: 'selectedRoutine', component: SelectedRoutineComponent},
  { path: 'add', title: 'add', component: RoutineComponent},
  { path: 'add/:selectedRoutine', title: 'addRoutine', component: SelectedRoutineComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
