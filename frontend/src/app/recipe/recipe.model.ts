import { RecipeIngredient } from "../ingredient/recipe-ingredient";

export interface Recipe {
  id: number;
  name: string;
  author: string;
  created:Date;
  mealType: string;
  dishType: string;
  dietType: string;
  allergens: string[];
  servings: number;
  preparationTime: number;
  imageUrl: string;
  ratings: RecipeRating[];
  ingredients:RecipeIngredient[];
}

export interface RecipeRating {
  userId: number;
  value: number;
  date: Date;
}

export interface PopularRecipe {
  recipe: Recipe;
  averageRating: number;
  ratingCount: number;
}