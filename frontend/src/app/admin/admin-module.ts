import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminHome } from './admin-home/admin-home';
import { Allergens } from './allergens/allergens';
import { RecipeTypes } from './recipe-types/recipe-types';
import { IngredientCategories } from './ingredient-categories/ingredient-categories';

@NgModule({
  declarations: [AdminHome, Allergens, RecipeTypes, IngredientCategories],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminHome },
      { path: 'allergens', component: Allergens },
      { path: 'recipe-types', component: RecipeTypes },
      { path: 'ingredient-categories', component: IngredientCategories },
    ]),
  ],
})
export class AdminModule {}