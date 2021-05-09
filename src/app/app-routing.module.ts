import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
