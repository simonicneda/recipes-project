import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminHome } from './admin-home/admin-home';
import { Allergens } from './allergens/allergens';
import { IngredientCategories } from './ingredient-categories/ingredient-categories';

@NgModule({
  declarations: [AdminHome, Allergens],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminHome },
      { path: 'allergens', component: Allergens },
    ]),
  ],
})
export class AdminModule {}