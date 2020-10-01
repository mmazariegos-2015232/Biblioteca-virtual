import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService],
})
export class ListComponent implements OnInit {
  public users:   User[];
  public status:  string;

  constructor(
    private _userService: UserService,
    private _router:      Router,
  ) { }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['home']);
      } else {
        this.listUsers();
      }
    }
  }

  listUsers: () => void = () => {
    this._userService.listUsers().subscribe(
      response => {
        if (response.users.length == 0) {
          this.status = "error";
        } else {
          this.users = response.users;
          this.status = "ok";
        }
      },
      error => this.onError(error)
    )
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    if (errorMessage != null) {
      this.status = 'error';
    }
  }
}
