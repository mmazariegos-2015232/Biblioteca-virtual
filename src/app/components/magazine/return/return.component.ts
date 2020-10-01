import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Magazine } from 'src/app/models/magazine.model';
import { UserService } from 'src/app/services/user.service';
import { MagazineService } from 'src/app/services/magazine.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  providers: [UserService, MagazineService]
})
export class ReturnComponent implements OnInit {
  public magazine: Magazine;
  public user: any;
  public status: string;
  public themesStr = {
    themes: ""
  };
  public keywordsStr = {
    keywords: ""
  };

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _magazineService: MagazineService,
  ) {
    this.user = this._userService.getIdentity();
    this.magazine = new Magazine("", "", "", "", "", "", "", [], [], 0, 0);
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role == "admin") {
        this._router.navigate(['users']);
      } else {
        this.getMagazineToReturn();
      }
    }
  }


  getMagazineToReturn: () => void = () => {
    var magazineId: string = this._router.url.split('/').pop();
    this._magazineService.getMagazine(magazineId).subscribe(
      response => {
        if (!response.magazine) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.magazine = response.magazine;
          this.themesStr.themes = this.magazine.themes.join(", ");
          this.keywordsStr.keywords = this.magazine.keywords.join(", ");
        }
      },
      error => this.onError(error)
    );

  }

  returnMagazine: () => void = () => {
    this._userService.returnMagazine(this.user._id, this.magazine._id).subscribe(
      response => {
        if (!response.message) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.getMagazineToReturn();
          alert(response.message);
          this._router.navigate(["users/magazines-return"]);
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
