import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})

export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _userServices: UserService 

    ) { }

  ngOnInit(): void {
  }
  logout: () => void = () => {
    localStorage.clear();
    this._router.navigate([""]);
  }

  cleanLocalStorage(): void {

  }

}
