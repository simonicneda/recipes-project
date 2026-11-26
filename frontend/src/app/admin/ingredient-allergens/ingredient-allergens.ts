import { Component, inject } from '@angular/core';
import { AllergenService } from '../allergens/allergen.service';

@Component({
  selector: 'app-ingredient-allergens',
  standalone: false,
  templateUrl: './ingredient-allergens.html',
  styleUrl: './ingredient-allergens.css',
})
export class IngredientAllergens {
  readonly allergenService = inject(AllergenService);
  ingredientId: number | null = null;
  selectedIds: number[] = [];
  message = '';

  selectIngredient(id: number | null): void {
    this.ingredientId = id;
    const ingredient = this.allergenService.ingredients.find(item => item.id === id);
    this.selectedIds = ingredient ? [...ingredient.allergenIds] : [];
    this.message = '';
  }

  toggleAllergen(id: number, checked: boolean): void {
    if (checked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }

    this.message = '';
  }

  save(): void {
    if (this.ingredientId === null) {
      return;
    }

    const saved = this.allergenService.saveIngredientAllergens(this.ingredientId, this.selectedIds);
    this.message = saved ? 'Alergeni su sačuvani.' : 'Čuvanje alergena nije uspelo.';
  }
}