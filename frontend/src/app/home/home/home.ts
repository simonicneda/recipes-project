import { Component, inject, OnInit } from '@angular/core';
import { PopularRecipe,Recipe } from '../../recipe/recipe.model';
import { RecipeService } from '../../recipe/recipes.service';

@Component({
  selector: 'app-home',
  standalone: false,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home{
  private recipeService=inject(RecipeService);
  
  popularRecipes:PopularRecipe[]=this.recipeService.getPopularRecipes();
  latestRecipes:Recipe[]=this.recipeService.getLatestRecipes();

  selected: 'popular'|'latest'='popular'
}
