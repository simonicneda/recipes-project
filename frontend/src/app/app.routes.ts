
import { Routes } from '@angular/router';
import { Home } from './home/home/home';
import { UserProfile } from './user-profile/user-profile/user-profile';
import { adminGuard } from './admin/admin.guard';
import { EditProfile } from './user-profile/edit-profile/edit-profile';

export const routes: Routes = [
  {
    path: 'admin',
    canMatch: [adminGuard],
    loadChildren: () => import('./admin/admin-module').then(module => module.AdminModule),
  },
  {
    path: '',
    component: Home
  },
  {
    path: 'profile',
    component: UserProfile
  },
  {
    path: 'profile/edit',
    component: EditProfile
  },
  {
    path: 'profile/:id',
    component: UserProfile
  }
];
