import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Magazine } from '../models/magazine.model';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  private url:       string;
  private identity:  any;
  private token:     string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService,  
  ) {
    this.url = GLOBAL.apiUrl;
  }

  createMagazine: (magazine: Magazine) => Observable<any> = (magazine) => {
    let params = JSON.stringify(magazine);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(`${this.url}/magazines`, params, { headers: headers });
  }

  updateMagazine: (magazine: Magazine) => Observable<any> = (magazine) => {
    let params = JSON.stringify(magazine);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put(`${this.url}/magazines/${magazine._id}`, params, { headers: headers });
  }

  deleteMagazine: (magazineId: string) => Observable<any> = (magazineId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.delete(`${this.url}/magazines/${magazineId}`, { headers: headers });
  }

  getMagazine: (magazineId: string) => Observable<any> = (magazineId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(`${this.url}/magazines/${magazineId}`, { headers: headers });
  }

  listMagazines: () => Observable<any> = () => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(`${this.url}/magazines`, { headers: headers });
  }
}

