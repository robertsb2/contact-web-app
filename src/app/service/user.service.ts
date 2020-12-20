import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  public _currentUser = this._currentUser$.asObservable();
  public authenticationErrorEvent = new EventEmitter();

  constructor() { }

  login(data: { email: string; passwd: string; }): void {

    // For demo use only. Production application would use a back end to manage legitamate users
    if (data.email && data.passwd) {
      console.log('Logged In');
      this._currentUser$.next(new User('jdos893j587hd', 'Demo User', data.email));
    } else {
      this.authenticationErrorEvent.emit('Invalid Credentials');
    }
  }

  logout(): void {
    this._currentUser$.next(null);
  }

  /* I would normally include registration functionality,
    but since this demo is all in memory it would be identical the login method */
  register(data: { email: string; passwd: string; }): void {
    this.login(data);
  }


}
