
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    private profile: User = {
        id: 1,
        username: 'korisnicko_ime',
        profileImage: 'https://i.pravatar.cc/150?img=5',
        region: 'Srbija',
        bio: 'Ovde ide biografija korisnika.',
        recipeCount: 10
    };

    getProfile(): User {
        return this.profile;
    }

    updateProfile(updatedData: Partial<User>): void {
        this.profile = {
            ...this.profile,
            ...updatedData
        };
    }
}
