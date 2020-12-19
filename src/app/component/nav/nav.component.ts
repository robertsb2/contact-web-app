import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  currentUser = new User('Demo User', 'Demo@Email.com');

  constructor() { }

  ngOnInit(): void {
  }


  logout(): void {

  }

}
