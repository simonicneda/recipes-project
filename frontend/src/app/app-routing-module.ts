import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home/home';
import { UserProfile } from './user-profile/user-profile/user-profile';
import { adminGuard } from './admin/admin.guard';

const routes: Routes = [
  {
  path: 'admin',
  canMatch: [adminGuard],
  loadChildren: () => import('./admin/admin-module').then(module => module.AdminModule),
  },
  {
    path:'',
    component: Home
  },
  {
    path: 'profile',
    component: UserProfile
  },
  {
    path: 'profile/:id',
    component: UserProfile
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
