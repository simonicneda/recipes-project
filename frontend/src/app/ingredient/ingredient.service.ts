import { Injectable } from '@angular/core';
import { UserIngredient } from './user-ingredient';
import { IngredientType } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private userIngredients: UserIngredient[] = [
    {
      id: 1,
      userId: 1,
      ingredient: {
        id: 1,
        name: 'Brašno',
        category: 'Žitarice',
        unit: 'g',
        type: IngredientType.GENERIC,
        allergenIds: [1]
      }
    },
    {
      id: 2,
      userId: 1,
      ingredient: {
        id: 2,
        name: 'Mleko',
        category: 'Mlečni proizvodi',
        unit: 'ml',
        type: IngredientType.GENERIC,
        allergenIds: [2]
      }
    },
    {
      id: 3,
      userId: 1,
      ingredient: {
        id: 3,
        name: 'Jaja',
        category: 'Mlečni proizvodi',
        unit: 'kom',
        type: IngredientType.GENERIC,
        allergenIds: [3]
      }
    }
  ];

  getUserIngredients(): UserIngredient[] {
    return this.userIngredients;
  }
}