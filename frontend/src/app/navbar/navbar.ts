import { Component, signal, inject, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { DemoRoleService } from '../core/demo-role.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  menuOpen=signal(false);
  readonly role = inject(DemoRoleService).role;
  readonly demoMode = isDevMode();
  private readonly router = inject(Router);

  switchDemoRole(): void {
    if (!this.demoMode) {
      return;
    }

    if (this.role() === 'admin') {
      this.role.set('user');
      void this.router.navigate(['/']);
    } else {
      this.role.set('admin');
    }
  } 

  toggleMenu():void{
    this.menuOpen.update(value=>!value);
  }
}
