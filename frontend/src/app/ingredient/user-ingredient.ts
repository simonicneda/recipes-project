import { Ingredient } from "./ingredient.model";
export interface UserIngredient {
  id: number;
  userId: number;
  ingredient: Ingredient;
  brand?: string;
  quantity?: number;
  unit?: string;
  expirationDate?: Date;
}