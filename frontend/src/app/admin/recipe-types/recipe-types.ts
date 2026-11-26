import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface RecipeTypeGroup {
  label: string;
  names: string[];
}

@Component({
  selector: 'app-recipe-types',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-types.html',
  styleUrl: './recipe-types.css',
})
export class RecipeTypes {
  readonly groups: RecipeTypeGroup[] = [
    {
      label: 'Tipovi obroka',
      names: ['Doručak', 'Ručak', 'Večera', 'Glavna jela', 'Predjela', 'Salate', 'Deserti', 'Pića'],
    },
    {
      label: 'Tipovi jela',
      names: [
        'Supa', 'Čorba', 'Testenina', 'Pica', 'Sendvič', 'Burger', 'Rižoto', 'Jelo od mesa',
        'Jelo od ribe', 'Jelo od povrća', 'Pekarski proizvod', 'Kolač', 'Torta', 'Palačinke',
      ],
    },
    {
      label: 'Tipovi ishrane',
      names: ['Vegetarijanska', 'Veganska', 'Posna', 'Mrsna', 'Hrono', 'Pesketarijanska'],
    },
  ];

  selectedGroup = this.groups[0];
  search = '';
  ascending = true;
  page = 1;
  readonly pageSize = 5;
  name = '';
  editingName: string | null = null;
  error = '';

  get filteredNames(): string[] {
    const search = this.search.trim().toLocaleLowerCase('sr-Latn');

    return this.selectedGroup.names
      .filter(name => name.toLocaleLowerCase('sr-Latn').includes(search))
      .sort((first, second) => {
        const comparison = first.localeCompare(second, 'sr-Latn');
        return this.ascending ? comparison : -comparison;
      });
  }

  get visibleNames(): string[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredNames.slice(start, start + this.pageSize);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredNames.length / this.pageSize));
  }

  selectGroup(group: RecipeTypeGroup): void {
    this.selectedGroup = group;
    this.search = '';
    this.page = 1;
    this.resetForm();
  }

  changeSearch(value: string): void {
    this.search = value;
    this.page = 1;
  }

  changeSort(): void {
    this.ascending = !this.ascending;
    this.page = 1;
  }

  editType(name: string): void {
  this.editingName = name;
  this.name = name;
  this.error = '';
  }

  saveType(): void {
    const name = this.name.trim();
    const names = this.selectedGroup.names;

    if (!name) {
      this.error = 'Unesi naziv tipa.';
      return;
    }

    const normalizedName = name.toLocaleLowerCase('sr-Latn');
    const duplicate = names.some(existingName =>
      existingName !== this.editingName &&
      existingName.toLocaleLowerCase('sr-Latn') === normalizedName
    );

    if (duplicate) {
      this.error = 'Tip sa tim nazivom već postoji u ovoj grupi.';
      return;
    }

    if (this.editingName === null) {
      names.push(name);
    } else {
      const index = names.indexOf(this.editingName);
      names[index] = name;
    }

    this.search = '';
    const savedIndex = this.filteredNames.indexOf(name);
    this.page = Math.floor(savedIndex / this.pageSize) + 1;
    this.resetForm();
  }

  deleteType(name: string): void {
    const names = this.selectedGroup.names;
    const index = names.indexOf(name);

    if (index === -1 || !window.confirm('Obrisati tip „' + name + '“?')) {
      return;
    }

    names.splice(index, 1);
    this.page = Math.min(this.page, this.pageCount);

    if (this.editingName === name) {
      this.resetForm();
    }
  }
  resetForm(): void {
    this.name = '';
    this.editingName = null;
    this.error = '';
  }
}