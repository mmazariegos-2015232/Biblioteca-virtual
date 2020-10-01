import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magazine } from 'src/app/models/magazine.model';
import { MagazineService } from 'src/app/services/magazine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-magazines-to-return',
  templateUrl: './view-magazines-to-return.component.html',
  styleUrls: ['./view-magazines-to-return.component.css'],
  providers: [MagazineService, UserService],
})
export class ViewMagazinesToReturnComponent implements OnInit {

  public magazines: Magazine;
  public status: string;

  constructor(
    private _magazineService: MagazineService,
    private _router: Router,
    private _userService: UserService 

  ) { }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role == "admin") {
        this._router.navigate(['home']);
      } else {
        this.listMagazines();
      }
    }
  }

  listMagazines: () => void = () => {
    this._magazineService.listMagazines().subscribe(
      response => {
        if (response.magazines.length == 0) {
          this.status = "error";
        } else {
          this.magazines = response.magazines;
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
