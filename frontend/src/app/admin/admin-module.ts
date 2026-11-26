
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminHome } from './admin-home/admin-home';
import { Allergens } from './allergens/allergens';
import { RecipeTypes } from './recipe-types/recipe-types';
import { IngredientCategories } from './ingredient-categories/ingredient-categories';
import { IngredientAllergens } from './ingredient-allergens/ingredient-allergens';

@NgModule({
  imports: [
    FormsModule,
    AdminHome,
    Allergens,
    RecipeTypes,
    IngredientCategories,
    IngredientAllergens,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminHome },
      { path: 'allergens', component: Allergens },
      { path: 'recipe-types', component: RecipeTypes },
      { path: 'ingredient-categories', component: IngredientCategories },
      { path: 'ingredient-allergens', component: IngredientAllergens },
    ]),
  ],
})
export class AdminModule {}
