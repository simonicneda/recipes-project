import { Recipe } from "../recipe/recipe.model";
import { Ingredient } from "./ingredient.model";
export enum IngredientSelectionMode {
  MANUAL = 'manual',
  INVENTORY = 'inventory'
}

export interface IngredientSearchFilter {
  mode: IngredientSelectionMode;
  availableIngredients: Ingredient[];
  maxMissingIngredients: number;
}

export interface RecipeAvailability {
  recipe: Recipe;
  missingIngredients: Ingredient[];
  missingIngredientsCount: number;
  canPrepare: boolean;
}