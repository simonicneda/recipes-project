import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminHome } from './admin-home/admin-home';
import { Allergens } from './allergens/allergens';
import { RecipeTypes } from './recipe-types/recipe-types';

@NgModule({
  declarations: [AdminHome, Allergens, RecipeTypes],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminHome },
      { path: 'allergens', component: Allergens },
      { path: 'recipe-types', component: RecipeTypes },
    ]),
  ],
})
export class AdminModule {}