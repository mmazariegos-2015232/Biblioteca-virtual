import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public user:      User;
  public token:     string;
  public identity:  any;
  public status:    string;

  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {
    this.user = new User("", "", "", "", "", "", "", "", [], []);
  }

  ngOnInit(): void {

  }

  login: () => void = () => {
    this._userService.login(this.user).subscribe(
      response=> {
        this.identity = response.user;
        if (!this.identity) {
          this.status = "error";
        } else {
          localStorage.setItem("identity", JSON.stringify(this.identity));
          this.status = "ok";
          this.getToken();
        }
      },
      error => this.onError(error)
    );
  }

  getToken: () => void = () => {
    this._userService.login(this.user, "true").subscribe(
      response => {
        this.token = response.token;
        if (!this.identity) {
          this.status = "error";
        } else {
          localStorage.setItem("token", JSON.stringify(this.token));
          this.status = "ok";
          if (this.identity.role == 'admin') {
            this._router.navigate(['users']);
          } else {
            this._router.navigate(['home']);
          }
        }
      },
      error => this.onError(error)
    );
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    if (errorMessage != null) {
      this.status = 'error';
    }
  }
}
