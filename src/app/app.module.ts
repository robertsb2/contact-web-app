import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NavComponent } from './component/nav/nav.component';
import { ContactTableComponent } from './component/contact-table/contact-table.component';
import { HomeComponent } from './component/home/home.component';
import { ContactsComponent } from './component/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ContactTableComponent,
    HomeComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
