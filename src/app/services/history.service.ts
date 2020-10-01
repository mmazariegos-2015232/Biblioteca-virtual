import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private url:      string;
  private identity: any;
  private token:    string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService,
  ) {
    this.url = GLOBAL.apiUrl;
  }

  listHistories: () => Observable<any> = () => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(`${this.url}/histories`, {headers: headers});
  }
}
