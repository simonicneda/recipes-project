import { Component } from '@angular/core';

interface Allergen {
  id: number;
  name: string;
}

@Component({
  selector: 'app-allergens',
  standalone: false,
  templateUrl: './allergens.html',
  styleUrl: './allergens.css',
})
export class Allergens {
  private readonly allergens: Allergen[] = [
    { id: 1, name: 'Mleko' },
    { id: 2, name: 'Gluten' },
    { id: 3, name: 'Kikiriki' },
    { id: 4, name: 'Jaja' },
    { id: 5, name: 'Soja' },
    { id: 6, name: 'Susam' },
  ];
  name = '';
  editingId: number | null = null;
  error = '';
  private nextId = 7;
  search = '';
  ascending = true;
  page = 1;
  readonly pageSize = 3;

  get filteredAllergens(): Allergen[] {
    const search = this.search.trim().toLocaleLowerCase('sr-Latn');

    return this.allergens
      .filter(allergen => allergen.name.toLocaleLowerCase('sr-Latn').includes(search))
      .sort((first, second) => {
        const comparison = first.name.localeCompare(second.name, 'sr-Latn');
        return this.ascending ? comparison : -comparison;
      });
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredAllergens.length / this.pageSize));
  }

  get visibleAllergens(): Allergen[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredAllergens.slice(start, start + this.pageSize);
  }

  changeSearch(value: string): void {
    this.search = value;
    this.page = 1;
  }

  changeSort(): void {
    this.ascending = !this.ascending;
    this.page = 1;
  }
  saveAllergen(): void {
  const name = this.name.trim();

  if (!name) {
    this.error = 'Unesi naziv alergena.';
    return;
  }

  const duplicate = this.allergens.some(allergen =>
    allergen.id !== this.editingId &&
    allergen.name.toLocaleLowerCase('sr-Latn') === name.toLocaleLowerCase('sr-Latn')
  );

  if (duplicate) {
    this.error = 'Alergen sa tim nazivom već postoji.';
    return;
  }

  if (this.editingId === null) {
    this.allergens.push({ id: this.nextId, name });
    this.nextId++;
  } else {
    const allergen = this.allergens.find(item => item.id === this.editingId);
    if (allergen) {
      allergen.name = name;
    }
  }

  this.page = Math.min(this.page, this.pageCount);
  this.resetForm();
  }

  editAllergen(allergen: Allergen): void {
  this.editingId = allergen.id;
  this.name = allergen.name;
  this.error = '';
  }

  deleteAllergen(allergen: Allergen): void {
    if (!window.confirm('Obrisati alergen "' + allergen.name + '"?')) {
      return;
    }

    const index = this.allergens.indexOf(allergen);
    this.allergens.splice(index, 1);
    this.page = Math.min(this.page, this.pageCount);

    if (this.editingId === allergen.id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.editingId = null;
    this.name = '';
    this.error = '';
  }
}