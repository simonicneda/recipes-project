import { isDevMode, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home/home';

const routes: Routes = [
  {
  path: 'admin',
  canMatch: [() => isDevMode()],
  loadChildren: () => import('./admin/admin-module').then(module => module.AdminModule),
  },
  {
    path:'',
    component: Home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
