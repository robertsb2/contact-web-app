import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { ModalComponent } from './component/modal/modal.component';
import { LoginComponent } from './component/login/login.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { ContactTableComponent } from './component/contact-table/contact-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ContactTableComponent,
    HomeComponent,
    ContactsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
