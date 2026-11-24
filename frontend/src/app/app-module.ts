import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home/home';
import { Navbar } from './navbar/navbar';
import { UserProfile } from './user-profile/user-profile/user-profile';

@NgModule({
  declarations: [App, Home, Navbar, UserProfile],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
