import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/service/user.service';

import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, OnDestroy {

  private _currentUser$: Subscription;
  public _currentUser: User | null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this._currentUser = null;
    this._currentUser$ = this.userService._currentUser.subscribe(
      data => {
        if (data) {
          this._currentUser = data;

        } else {
          this.router.navigate(['']);
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._currentUser$.unsubscribe();
  }


  logout(): void {
    this.userService.logout();
  }

}
