import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

// AuthGuardService handles route protection. Only authenticated users can access protected routes.
export class AuthGuardService implements CanActivate {

  private isAuthenticated = false;
  private currentUser$: Subscription;


  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService._currentUser.subscribe(
      data => {
        if (data) {
          this.isAuthenticated = true;
        }
      }
    );
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
