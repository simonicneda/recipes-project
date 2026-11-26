import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../../recipe/recipes.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe],
  standalone: true,
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private recipeService = inject(RecipeService);

  protected readonly popularRecipes = this.recipeService.popularRecipes;
  protected readonly latestRecipes = this.recipeService.latestRecipes;

  protected readonly selected = signal<'popular' | 'latest'>('popular');

  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');

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
}
