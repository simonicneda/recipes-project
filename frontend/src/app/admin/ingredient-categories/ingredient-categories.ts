import { Component } from '@angular/core';

interface IngredientCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-ingredient-categories',
  standalone: false,
  templateUrl: './ingredient-categories.html',
  styleUrl: './ingredient-categories.css',
})
export class IngredientCategories {
  private readonly categories: IngredientCategory[] = [
    { id: 1, name: 'Povrće' },
    { id: 2, name: 'Voće' },
    { id: 3, name: 'Meso' },
    { id: 4, name: 'Riba' },
    { id: 5, name: 'Mlečni proizvodi' },
    { id: 6, name: 'Žitarice' },
    { id: 7, name: 'Začini' },
    { id: 8, name: 'Orašasti plodovi' },
  ];
  private nextId = 9;

  name = '';
  editingCategory: IngredientCategory | null = null;
  error = '';
  search = '';
  ascending = true;
  page = 1;
  readonly pageSize = 5;

  get filteredCategories(): IngredientCategory[] {
    const query = this.search.trim().toLocaleLowerCase('sr-Latn');

    return this.categories
      .filter(category => category.name.toLocaleLowerCase('sr-Latn').includes(query))
      .sort((first, second) => {
        const order = first.name.localeCompare(second.name, 'sr-Latn');
        return this.ascending ? order : -order;
      });
  }

  get visibleCategories(): IngredientCategory[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredCategories.slice(start, start + this.pageSize);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredCategories.length / this.pageSize));
  }

  changeSearch(value: string): void {
    this.search = value;
    this.page = 1;
  }

  changeSort(): void {
    this.ascending = !this.ascending;
    this.page = 1;
  }

  editCategory(category: IngredientCategory): void {
    this.editingCategory = category;
    this.name = category.name;
    this.error = '';
  }

  saveCategory(): void {
    const name = this.name.trim();

    if (!name) {
      this.error = 'Unesi naziv kategorije.';
      return;
    }

    const normalizedName = name.toLocaleLowerCase('sr-Latn');
    const duplicate = this.categories.some(category =>
      category !== this.editingCategory &&
      category.name.toLocaleLowerCase('sr-Latn') === normalizedName
    );

    if (duplicate) {
      this.error = 'Kategorija sa tim nazivom već postoji.';
      return;
    }

    let savedCategory = this.editingCategory;

    if (savedCategory) {
      savedCategory.name = name;
    } else {
      savedCategory = { id: this.nextId, name };
      this.nextId++;
      this.categories.push(savedCategory);
    }

    this.search = '';
    const savedIndex = this.filteredCategories.indexOf(savedCategory);
    this.page = Math.floor(savedIndex / this.pageSize) + 1;
    this.resetForm();
  }

  resetForm(): void {
    this.name = '';
    this.editingCategory = null;
    this.error = '';
  }
}