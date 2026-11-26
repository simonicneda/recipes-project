import { Injectable } from '@angular/core';

export interface Allergen {
  id: number;
  name: string;
}

interface Ingredient {
  id: number;
  name: string;
  allergenIds: number[];
}

interface AllergenData {
  allergens: Allergen[];
  ingredients: Ingredient[];
}

@Injectable({ providedIn: 'root' })
export class AllergenService {
  private readonly storageKey = 'recipes-admin-allergens-v1';
  private data = this.loadData();

  get allergens(): readonly Allergen[] {
    return this.data.allergens;
  }

  get ingredients(): readonly Ingredient[] {
    return this.data.ingredients;
  }

  saveAllergen(id: number | null, name: string): boolean {
    const allergens = this.data.allergens;

    if (id === null) {
      const nextId = Math.max(0, ...allergens.map(allergen => allergen.id)) + 1;
      return this.saveData({ ...this.data, allergens: [...allergens, { id: nextId, name }] });
    }

    const updated = allergens.map(allergen => allergen.id === id ? { id, name } : allergen);
    return this.saveData({ ...this.data, allergens: updated });
  }

  deleteAllergen(id: number): boolean {
    const allergens = this.data.allergens.filter(allergen => allergen.id !== id);
    const ingredients = this.data.ingredients.map(ingredient => ({
      ...ingredient,
      allergenIds: ingredient.allergenIds.filter(allergenId => allergenId !== id),
    }));

    return this.saveData({ allergens, ingredients });
  }

  saveIngredientAllergens(ingredientId: number, allergenIds: number[]): boolean {
    if (!this.data.ingredients.some(ingredient => ingredient.id === ingredientId)) {
      return false;
    }

    const validIds = this.data.allergens
      .filter(allergen => allergenIds.includes(allergen.id))
      .map(allergen => allergen.id);

    const ingredients = this.data.ingredients.map(ingredient =>
      ingredient.id === ingredientId ? { ...ingredient, allergenIds: validIds } : ingredient
    );

    return this.saveData({ ...this.data, ingredients });
  }

  private saveData(data: AllergenData): boolean {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.data = data;
      return true;
    } catch {
      return false;
    }
  }

  private loadData(): AllergenData {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data?.allergens) && Array.isArray(data?.ingredients)) {
          return data;
        }
      }
    } catch {
      // Koristi probne podatke ako sačuvani podaci nisu dostupni.
    }

    return {
      allergens: [
        { id: 1, name: 'Mleko' },
        { id: 2, name: 'Gluten' },
        { id: 3, name: 'Kikiriki' },
        { id: 4, name: 'Jaja' },
        { id: 5, name: 'Soja' },
        { id: 6, name: 'Susam' },
      ],
      ingredients: [
        { id: 1, name: 'Keks', allergenIds: [] },
        { id: 2, name: 'Pšenično brašno', allergenIds: [2] },
        { id: 3, name: 'Jogurt', allergenIds: [1] },
      ],
    };
  }
}