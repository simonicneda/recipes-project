export interface User {
  id: number;
  username: string;
  profileImage: string;
  region: string;
  bio?: string;
  recipeCount: number;
}