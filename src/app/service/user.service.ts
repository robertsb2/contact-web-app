import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser$: BehaviorSubject<User | null>;
  public _currentUser: Observable<User | null>;
  public authenticationErrorEvent = new EventEmitter();

  constructor() {

    // Checks for previously authenticated user token to skip login
    const user = localStorage.getItem('currentUser');
    if (user) {
      this._currentUser$ = new BehaviorSubject<User | null>(JSON.parse(user));
    } else {
      this._currentUser$ = new BehaviorSubject<User | null>(null);
    }
    this._currentUser = this._currentUser$.asObservable();
  }

  login(data: { email: string; password: string; }): void {

    // For demo use only. Production application would use a back end to manage legitamate users
    if (data.email && data.password) {
      this._currentUser$.next(new User('jdos893j587hd', 'Demo User', data.email));
    } else {
      this.authenticationErrorEvent.emit('Invalid Credentials');
      return;
    }

    // For simplicity's sake, I'm storing the full user here, but I'd realistically use an auhentication token from the backend.
    localStorage.setItem('currentUser', JSON.stringify(this._currentUser$.getValue()));
  }

  logout(): void {
    this._currentUser$.next(null);
    localStorage.removeItem('currentUser');
  }

  /* I would normally include separate registration functionality,
    but since this demo is all in memory it would be identical to the login method */
  register(data: { email: string; password: string; }): void {
    this.login(data);
  }


}
