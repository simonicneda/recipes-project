import { Ingredient } from "./ingredient.model";
export interface RecipeIngredient {
  ingredient: Ingredient;
  quantity?: number;
  unit: string;
}