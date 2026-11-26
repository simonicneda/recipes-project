import { Component, inject, signal, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { disabled, form, maxLength, required } from '@angular/forms/signals';
import { UserProfileService } from '../user.profile.service';

const BIO_MAX_LENGTH = 500;

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnDestroy {
  private readonly router = inject(Router);

  protected readonly bioMax = BIO_MAX_LENGTH;
  private readonly profileService = inject(UserProfileService);

  private readonly model = signal({
    username: this.profileService.getProfile().username,
    region: this.profileService.getProfile().region,
    bio: this.profileService.getProfile().bio ?? '',
  });

  protected readonly form = form(this.model, (path) => {
    disabled(path.username);
    required(path.region, { message: 'Region je obavezan.' });
    maxLength(path.bio, BIO_MAX_LENGTH, {
      message: `Biografija može imati najviše ${BIO_MAX_LENGTH} karaktera.`,
    });
  });

  // profilna slika
  protected readonly imagePreview = signal<string | null>(null);
  protected readonly imageError = signal<string | null>(null);

  private selectedImage: File | null = null;

  protected onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    // provera tipa fajla
    if (!allowedTypes.includes(file.type)) {
      this.selectedImage = null;
      this.imagePreview.set(null);
      this.imageError.set(
        'Neispravan format slike. Dozvoljeni su JPG, PNG i WEBP formati.'
      );

      input.value = '';
      return;
    }

    // ako je slika ispravna
    this.imageError.set(null);
    this.selectedImage = file;

    // kreiranje pregleda slike
    const previewUrl = URL.createObjectURL(file);

    const previousPreview = this.imagePreview();
    if (previousPreview) {
      URL.revokeObjectURL(previousPreview);
    }

    this.imagePreview.set(previewUrl);
  }

  ngOnDestroy(): void {
    const preview = this.imagePreview();

    if (preview) {
      URL.revokeObjectURL(preview);
    }
  }


  protected submit(event: Event): void {
    event.preventDefault();

    if (!this.form().valid()) {
      return;
    }

    const values = this.model();

    const saveProfile = (profileImage?: string) => {
      this.profileService.updateProfile({
        username: values.username,
        region: values.region,
        bio: values.bio,
        ...(profileImage ? { profileImage } : {})
      });

      this.router.navigate(['/profile']);
    };

    if (this.selectedImage) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          saveProfile(reader.result);
        }
      };

      reader.readAsDataURL(this.selectedImage);
    } else {
      saveProfile();
    }
  }

}
