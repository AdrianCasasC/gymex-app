import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectedRoutineComponent } from './pages/selected-routine/selected-routine.component';
import { MyRoutinesComponent } from './pages/my-rouitnes/my-routines.component';
import { WeeksComponent } from './pages/weeks/weeks.component';
import { RegisterComponent } from './pages/register/register.component';
import { isLoggedGuard, isNotLoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [isLoggedGuard] },
  /*{ path: 'routine', title: 'routine', component: RoutineComponent, children: [{
    path: ':selectedRoutine', title: 'selectedRoutine', component: SelectedRoutineComponent
  }]},*/
  {
    path: 'routine',
    title: 'routine',
    component: MyRoutinesComponent,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'weeks',
    title: 'weeks',
    component: WeeksComponent,
    canActivate: [isLoggedGuard],
  },
  //{ path: 'routine/:selectedRoutine', title: 'selectedRoutine', component: SelectedRoutineComponent},
  {
    path: 'add/:selectedRoutine',
    title: 'addRoutine',
    component: SelectedRoutineComponent,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'login',
    title: 'login',
    component: LoginComponent,
    canActivate: [isNotLoggedGuard],
  },
  {
    path: 'register',
    title: 'register',
    component: RegisterComponent,
    canActivate: [isNotLoggedGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
