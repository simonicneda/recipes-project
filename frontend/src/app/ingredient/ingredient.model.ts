export enum IngredientType {
  GENERIC = 'generic',
  BRANDED = 'branded'
}

export interface Ingredient {
  id: number;
  name: string;
  category: string;
  unit: string;
  type: IngredientType;
  allergenIds: number[];
}