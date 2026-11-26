import { Injectable, signal, computed } from "@angular/core";
import { Recipe, PopularRecipe } from "./recipe.model";
import { RecipeIngredient } from "../ingredient/recipe-ingredient";
import { Ingredient,IngredientType } from "../ingredient/ingredient.model";
import { RecipeAvailability } from "../ingredient/ingredient-search-filter";

const ingredients: Ingredient[] = [
  {
    id: 1,
    name: 'Brašno',
    category: 'Žitarice',
    unit: 'g',
    type: IngredientType.GENERIC,
    allergenIds: [1]
  },
  {
    id: 2,
    name: 'Mleko',
    category: 'Mlečni proizvodi',
    unit: 'ml',
    type: IngredientType.GENERIC,
    allergenIds: [2]
  },
  {
    id: 3,
    name: 'Jaja',
    category: 'Jaja',
    unit: 'kom',
    type: IngredientType.GENERIC,
    allergenIds: [3]
  },
  {
    id: 4,
    name: 'Šećer',
    category: 'Zaslađivači',
    unit: 'g',
    type: IngredientType.GENERIC,
    allergenIds: []
  },
  {
    id: 5,
    name: 'Pečurke',
    category: 'Povrće',
    unit: 'g',
    type: IngredientType.GENERIC,
    allergenIds: []
  },
  {
    id: 6,
    name: 'Testenina',
    category: 'Žitarice',
    unit: 'g',
    type: IngredientType.GENERIC,
    allergenIds: [1]
  },
  {
    id: 7,
    name: 'Pavlaka za kuvanje',
    category: 'Mlečni proizvodi',
    unit: 'ml',
    type: IngredientType.GENERIC,
    allergenIds: [2]
  },
  {
    id: 8,
    name: 'Beli luk',
    category: 'Povrće',
    unit: 'g',
    type: IngredientType.GENERIC,
    allergenIds: []
  },
  {
    id: 9,
    name: 'Paradajz',
    category: 'Povrće',
    unit: 'kom',
    type: IngredientType.GENERIC,
    allergenIds: []
  },
];

const getIngredient = (id: number): Ingredient => {
  return ingredients.find(ingredient => ingredient.id === id)!;
};

@Injectable({ providedIn: 'root' })
export class RecipeService {

  private readonly recipes = signal<Recipe[]>([
    {
      id: 1,
      name: 'Kremasta pasta sa pečurkama',
      author: 'Ana',
      created: new Date('2026-11-11'),
      mealType: 'Ručak',
      dishType: 'Testenina',
      dietType: 'Vegetarijanska',
      allergens: ['Gluten', 'Mleko'],
      servings: 2,
      preparationTime: 25,
      imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
      ratings: [
        { userId: 1, value: 5, date: this.daysAgo(2) },
        { userId: 2, value: 5, date: this.daysAgo(5) },
        { userId: 3, value: 4, date: this.daysAgo(10) }
      ],
      ingredients: [
        { ingredient: getIngredient(7), quantity: 200, unit: 'g' },
        { ingredient: getIngredient(5), quantity: 250, unit: 'g' },
        { ingredient: getIngredient(6), quantity: 200, unit: 'ml' },
      ]
    },
    {
      id: 2,
      name: 'Američke palačinke',
      author: 'Marko',
      created: new Date('2026-11-12'),
      mealType: 'Doručak',
      dishType: 'Palačinke',
      dietType: 'Vegetarijanska',
      allergens: ['Gluten', 'Mleko', 'Jaja'],
      servings: 4,
      preparationTime: 20,
      imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
      ratings: [
        { userId: 1, value: 5, date: this.daysAgo(1) },
        { userId: 2, value: 5, date: this.daysAgo(8) },
        { userId: 3, value: 5, date: this.daysAgo(15) },
        { userId: 4, value: 4, date: this.daysAgo(20) }
      ],
      ingredients: [
        { ingredient: getIngredient(1), quantity: 200, unit: 'g' },
        { ingredient: getIngredient(2), quantity: 250, unit: 'ml' },
        { ingredient: getIngredient(3), quantity: 2, unit: 'kom' },
        { ingredient: getIngredient(4), quantity: 30, unit: 'g' }
      ]
    },
    {
      id: 3,
      name: 'Mediteranska salata',
      author: 'Milica',
      created: new Date('2026-11-13'),
      mealType: 'Ručak',
      dishType: 'Salata',
      dietType: 'Vegetarijanska',
      allergens: ['Mleko'],
      servings: 2,
      preparationTime: 15,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      ratings: [
        { userId: 1, value: 4, date: this.daysAgo(3) },
        { userId: 2, value: 4, date: this.daysAgo(12) },
        { userId: 3, value: 5, date: this.daysAgo(18) }
      ],
      ingredients: [
        { ingredient: getIngredient(9), quantity: 2, unit: 'kom' },
        { ingredient: getIngredient(1), quantity: 1, unit: 'kom' },
        { ingredient: getIngredient(4), quantity: 100, unit: 'g' },
        { ingredient: getIngredient(2), quantity: 20, unit: 'ml' }
      ]
    },
    {
      id: 4,
      name: 'Čokoladni kolač',
      author: 'Jovana',
      created: new Date('2026-11-11'),
      mealType: 'Desert',
      dishType: 'Kolač',
      dietType: 'Vegetarijanska',
      allergens: ['Gluten', 'Mleko', 'Jaja'],
      servings: 6,
      preparationTime: 45,
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      ratings: [
        { userId: 1, value: 5, date: this.daysAgo(40) },
        { userId: 2, value: 5, date: this.daysAgo(50) }
      ],
      ingredients: [
        { ingredient: getIngredient(1), quantity: 200, unit: 'g' },
        { ingredient: getIngredient(3), quantity: 3, unit: 'kom' },
        { ingredient: getIngredient(4), quantity: 150, unit: 'g' },
      ]
    }
  ]);

  private daysAgo(days: number): Date {
    return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  }

  readonly popularRecipes = computed(() => {
    const last30 = this.daysAgo(30);

    return this.recipes()
      .map(recipe => {
        const recentRatings = recipe.ratings.filter(rating => rating.date >= last30);

        if (recentRatings.length === 0) {
          return null;
        }
        const total = recentRatings.reduce((sum, rating) => sum + rating.value, 0);

        return {recipe,averageRating: total / recentRatings.length,ratingCount: recentRatings.length};
      })
      .filter((item): item is PopularRecipe => item !== null)
      .sort((a, b) => b.averageRating - a.averageRating);
  });

  readonly latestRecipes = computed(() => {
    return [...this.recipes()].sort((a, b) => b.created.getTime() - a.created.getTime());
  });

  findByIngredients(availableIngredients:Ingredient[],maxMissing:number):RecipeAvailability[]{
    const availableIds=new Set(availableIngredients.map(ingredient=>ingredient.id));
    return this.recipes().map(recipe=>{
      const missingIngredients=recipe.ingredients.filter(recipeIngredient => !availableIds.has(recipeIngredient.ingredient.id)
        ).map(recipeIngredient => recipeIngredient.ingredient);
      
      return {recipe, missingIngredients, missingIngredientsCount:missingIngredients.length, canPrepare:missingIngredients.length===0};
    
      }).filter(result => result.missingIngredientsCount<=maxMissing);
  }

  findRecipeByName(searchText:string):Recipe[]{
    const search=searchText.trim().toLowerCase();
    if(!search){
      return this.recipes();
    }

    return this.recipes().filter(recipe => recipe.name.toLowerCase().includes(search));
  }
  
}
