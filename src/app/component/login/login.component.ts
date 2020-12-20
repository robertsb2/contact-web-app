import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user = { email: '', password: '' };
  currentUser$: Subscription;
  hasLoginError: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.hasLoginError = false;

    this.currentUser$ = this.userService._currentUser.subscribe(
      data => {
        if (data) {
          this.router.navigate(['/contacts']);
        }
      },
      err => {
        console.log(err);
      }
    );

    this.userService.authenticationErrorEvent.subscribe(
      (err: any) => {
        this.hasLoginError = true;
        console.log(err);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe();
  }


  onClickSubmit(data: { email: string; passwd: string; }): void {
    this.hasLoginError = false;
    this.userService.login(data);
  }

}
