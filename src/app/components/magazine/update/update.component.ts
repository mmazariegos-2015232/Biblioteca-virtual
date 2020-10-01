import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magazine } from 'src/app/models/magazine.model';
import { MagazineService } from 'src/app/services/magazine.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [MagazineService, UserService]
})
export class UpdateComponent implements OnInit {
  public magazine: Magazine;
  public status: string;
  public themesStr = {
    themes: ""
  };
  public keywordsStr = {
    keywords: ""
  };

  constructor(
    private _router: Router,
    private _magazineService: MagazineService,
    private _userService: UserService 

  ) {
    this.magazine = new Magazine("", "", "", "", "", "", "", [], [], 0, 0)
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['home']);
      } else {
        this.getMagazineToUpdate();
      }
    }
  }

  getMagazineToUpdate: () => void = () => {
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

  updateMagazine: () => void = () => {
    this.magazine.themes = [];
    this.magazine.keywords = [];
    this.themesStr.themes.split(",").forEach((theme) => {
      this.magazine.themes.push(theme.trim());
    });
    this.keywordsStr.keywords.split(",").forEach((keyword) => {
      this.magazine.keywords.push(keyword.trim());
    })
    this._magazineService.updateMagazine(this.magazine).subscribe(
      response => {
        if (!response.magazine) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.getMagazineToUpdate();
          alert(response.message);
          this._router.navigate(["magazines"]);
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
