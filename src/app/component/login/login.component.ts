import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private currentUser$: Subscription;
  user = { email: '', password: '' };
  hasLoginError: boolean;

  form: FormGroup;
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

    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
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
