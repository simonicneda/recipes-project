import { Component, computed, inject, signal } from '@angular/core';
import { RecipeService } from '../../recipe/recipes.service';
import { DecimalPipe } from '@angular/common';
import { IngredientService } from '../../ingredient/ingredient.service';
import { RecipeAvailability } from '../../ingredient/ingredient-search-filter';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe],
  standalone: true,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private recipeService = inject(RecipeService);
  private ingredientService=inject(IngredientService)

  protected readonly popularRecipes = this.recipeService.popularRecipes;
  protected readonly latestRecipes = this.recipeService.latestRecipes;
  protected readonly ingredientRecipes=signal<RecipeAvailability[]>([]);

  protected readonly selected = signal<'popular' | 'latest' | 'by_ingredients'>('popular');

  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');

  protected readonly search=signal('');
  protected readonly searchResults=computed(() => this.recipeService.findRecipeByName(this.search()));

  constructor() {
    try {
      this.popularRecipes();
      this.latestRecipes();
    } catch (error) {
      this.errorMessage.set('Greska pri ucitavanju recepata.');
    } finally {
      this.isLoading.set(false);
    }
  }

  protected loadRecipesByIngredients(): void{
    const userIngredients=this.ingredientService.getUserIngredients();
    const availableIngredients=userIngredients.map(userIngredient => userIngredient.ingredient);

    this.ingredientRecipes.set(this.recipeService.findByIngredients(availableIngredients,2));
  }

  protected onRecipeSortChange(value:string): void{
    this.selected.set(value as 'popular'|'latest'|'by_ingredients');
    if(value==='by_ingredients'){
      this.loadRecipesByIngredients();
    }
  }

  
}
