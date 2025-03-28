import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

export default [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
] as Routes;
