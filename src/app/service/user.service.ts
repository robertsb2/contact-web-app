import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser$: BehaviorSubject<User | null>;
  public _currentUser: Observable<User | null>;
  public authenticationErrorEvent = new EventEmitter();
  devMode = true;

  constructor() {
    const user = localStorage.getItem('currentUser');
    console.log(user);
    if (user) {
      this._currentUser$ = new BehaviorSubject<User | null>(JSON.parse(user));
    } else {
      this._currentUser$ = new BehaviorSubject<User | null>(null);
    }
    this._currentUser = this._currentUser$.asObservable();
  }

  login(data: { email: string; passwd: string; }): void {

    // For demo use only. Production application would use a back end to manage legitamate users
    if (this.devMode) {
      this._currentUser$.next(new User('jdos893j587hd', 'Demo User', 'email@email.com'));
    } else if (data.email && data.passwd) {
      this._currentUser$.next(new User('jdos893j587hd', 'Demo User', data.email));
    } else {
      this.authenticationErrorEvent.emit('Invalid Credentials');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(this._currentUser$.getValue()));
  }

  logout(): void {
    this._currentUser$.next(null);
    localStorage.removeItem('currentUser');
  }

  /* I would normally include registration functionality,
    but since this demo is all in memory it would be identical the login method */
  register(data: { email: string; passwd: string; }): void {
    this.login(data);
  }


}
