import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home/home';
import { Navbar } from './navbar/navbar';
import { UserProfile } from './user-profile/user-profile/user-profile';
import { EditProfile } from './user-profile/edit-profile/edit-profile';
import { FormField } from '@angular/forms/signals';

@NgModule({
  declarations: [App, Home, Navbar, UserProfile, EditProfile],
  imports: [BrowserModule, AppRoutingModule,FormField],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
