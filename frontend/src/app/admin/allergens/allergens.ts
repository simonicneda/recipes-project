import { Component, inject } from '@angular/core';
import { Allergen, AllergenService } from './allergen.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-allergens',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './allergens.html',
  styleUrl: './allergens.css',
})
export class Allergens {
  private readonly allergenService = inject(AllergenService);

  get allergens(): readonly Allergen[] {
    return this.allergenService.allergens;
  }
  name = '';
  editingId: number | null = null;
  error = '';
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

  if (!this.allergenService.saveAllergen(this.editingId, name)) {
    this.error = 'Čuvanje alergena nije uspelo.';
    return;
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

    if (!this.allergenService.deleteAllergen(allergen.id)) {
      this.error = 'Brisanje alergena nije uspelo.';
      return;
    }

    this.error = '';
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