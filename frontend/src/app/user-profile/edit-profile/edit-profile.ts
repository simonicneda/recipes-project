import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { disabled, form, maxLength, required } from '@angular/forms/signals';
const BIO_MAX_LENGTH = 500;

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {
  private readonly router = inject(Router);
  protected readonly bioMax = BIO_MAX_LENGTH;

  private readonly model = signal({
    username: 'korisnicko_ime',
    region: 'Srbija',
    bio: 'Ovde ide biografija korisnika.',
  });


  protected readonly form = form(this.model, (path) => {
    disabled(path.username); // po specifikaciji ovo se ne moze menjati jer je username
    required(path.region, { message: 'Region je obavezan.' });
    maxLength(path.bio, BIO_MAX_LENGTH, {
      message: `Biografija može imati najviše ${BIO_MAX_LENGTH} karaktera.`,
    });
  });

  protected submit(event: Event): void {
    event.preventDefault();

    this.router.navigate(['/profile']);
  }
}