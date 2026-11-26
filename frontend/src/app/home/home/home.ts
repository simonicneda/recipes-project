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
  popularRecipes:PopularRecipe[]=[];
  latestRecipes:Recipe[]=[];
  selected: 'popular'|'latest'='popular'

  errorMessage='';
  isLoading=true;
  constructor(){
    try{
      this.popularRecipes=this.recipeService.getPopularRecipes();
      this.latestRecipes=this.recipeService.getLatestRecipes();
    }catch(error){
      this.errorMessage='Greska pri ucitavanju.';
    }finally{
      this.isLoading=false;
    }
  }
}
