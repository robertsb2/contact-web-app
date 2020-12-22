import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ContactsComponent } from './component/contacts/contacts.component';

import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
