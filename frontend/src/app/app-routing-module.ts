import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home/home';
import { UserProfile } from './user-profile/user-profile/user-profile';
import { EditProfile } from './user-profile/edit-profile/edit-profile';

const routes: Routes = [
  {
    path:'',
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
