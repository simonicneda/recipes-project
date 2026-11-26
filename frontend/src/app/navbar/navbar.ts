import { Component,signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  menuOpen=signal(false);
  role='user'; 

  toggleMenu():void{
    this.menuOpen.update(value=>!value);
  }
}
