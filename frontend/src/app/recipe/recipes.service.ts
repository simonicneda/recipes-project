import { Injectable , signal,computed} from "@angular/core";
import { Recipe,PopularRecipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeService{
    private readonly recipes= signal<Recipe[]>([
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
      ]
    }
    ]);

    private daysAgo(days: number): Date {
        return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    }

    readonly popularRecipes=computed(()=>{
        const last30=this.daysAgo(30);
        return this.recipes().map(recipe =>{
            const recentRatings=recipe.ratings.filter(rating => rating.date>=last30);

            if (recentRatings.length===0){return null;}

            const total=recentRatings.reduce((sum,rating)=> sum+rating.value, 0);

            return {recipe, averageRating:total/recentRatings.length, ratingCount:recentRatings.length};

        }).filter((item):item is PopularRecipe => item!==null).sort((a,b) => b.averageRating-a.averageRating);
    });

    readonly latestRecipes=computed(()=>{
        return [...this.recipes()].sort((a,b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    });
}