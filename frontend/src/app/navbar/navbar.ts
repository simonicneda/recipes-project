import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  menuOpen=false;
  role='user'; 

  toggleMenu():void{
    this.menuOpen=!this.menuOpen;
  }
}
