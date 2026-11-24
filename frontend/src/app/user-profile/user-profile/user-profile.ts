import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  styleUrl: './user-profile.css',
  templateUrl: './user-profile.html',
})
export class UserProfile implements OnInit {
  user!: User;

  private myProfile: User = {
    id: 1,
    username: 'korisnicko_ime',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    region: 'Srbija',
    bio: 'Ovde ide biografija korisnika.',
    recipeCount: 10
  };

  private otherProfiles: User[] = [
    {
      id: 2,
      username: 'marko_kuvar',
      profileImage: 'https://i.pravatar.cc/150?img=12',
      region: 'Hrvatska',
      bio: 'Volim roštilj i testenine.',
      recipeCount: 4
    },
    {
      id: 3,
      username: 'ana_slastice',
      profileImage: 'https://i.pravatar.cc/150?img=32',
      region: 'Slovenija',
      recipeCount: 7
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = this.otherProfiles.find(u => u.id === Number(id));
        this.user = found ?? this.myProfile;
      } else {
        this.user = this.myProfile;
      }
    });
  }
}