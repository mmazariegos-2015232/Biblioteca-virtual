import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magazine } from 'src/app/models/magazine.model';
import { MagazineService } from 'src/app/services/magazine.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [MagazineService, UserService]
})
export class AddComponent implements OnInit {
  public magazine:    Magazine;
  public status:  string;
  public themesStr = {
    themes: ""
  };
  public keywordsStr = {
    keywords: ""
  };

  constructor(
    private _magazineService: MagazineService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.magazine = new Magazine("", "", "", "", "", "", "", [], [], 0, 0 );
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['home']);
      }
    }
  }

  addMagazine: () => void = () => {
    this.themesStr.themes.split(",").forEach((theme) => {
      this.magazine.themes.push(theme.trim());
    });
    this.keywordsStr.keywords.split(",").forEach((keyword) => {
      this.magazine.keywords.push(keyword.trim());
    })
    this._magazineService.createMagazine(this.magazine).subscribe(
      response => {
        if (!response.magazine) {
          this.status = 'error';
        } else {
          this.status = "ok";
          this.magazine =  new Magazine("", "", "", "", "", "", "", [], [], 0, 0 );
          this.keywordsStr.keywords = "";
          this.themesStr.themes = "";
          alert(response.message);
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
