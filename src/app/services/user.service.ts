import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private identity: any;
  private token: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.apiUrl;
  }

  login: (user: any, gettoken2?: any) => Observable<any> = (user, gettoken2) => {
    if (gettoken2 != null) {
      user.gettoken = gettoken2;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}/auth/login`, params, { headers: headers });
  }

  createUser: (user: User) => Observable<any> = (user) => {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.post(`${this.url}/users`, params, { headers: headers });
  }
  updateUser: (user: User) => Observable<any> = (user) => {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.put(`${this.url}/users/${user._id}`, params, { headers: headers });
  }

  deleteUser: (userId: string) => Observable<any> = (userId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.delete(`${this.url}/users/${userId}`, { headers: headers });
  }

  getUser: (userId: string) => Observable<any> = (userId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.get(`${this.url}/users/${userId}`, { headers: headers });
  }

  listUsers: () => Observable<any> = () => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.get(`${this.url}/users`, { headers: headers });
  }

  requestBook: (userId: string, bookId: string) => Observable<any> = (userId, bookId) => {
    let book = {
      book: bookId
  }
  let params = JSON.stringify(book)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.put(`${this.url}/users/${userId}/request-book`, params, { headers: headers });
  }

  returnBook: (userId: string, bookId: string) => Observable<any> = (userId, bookId) => {
    let book = {
      book: bookId
  }
  let params = JSON.stringify(book)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.put(`${this.url}/users/${userId}/return-book`, params, { headers: headers });
  }

  requestMagazine: (userId: string, magazineId: string) => Observable<any> = (userId, magazineId) => {
    let magazine = {
      magazine: magazineId
  }
  let params = JSON.stringify(magazine)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.put(`${this.url}/users/${userId}/request-magazine`, params, { headers: headers });
  }

  returnMagazine: (userId: string, magazineId: string) => Observable<any> = (userId, magazineId) => {
    let magazine = {
      magazine: magazineId
  }
  let params = JSON.stringify(magazine)
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

    return this._http.put(`${this.url}/users/${userId}/return-magazine`, params, { headers: headers });
  }


  getIdentity: () => any = () => {
    let identity2 = JSON.parse(localStorage.getItem('identity'));
    this.identity = identity2 != "undefined" ? identity2 : null;
    return this.identity;
  }

  getToken: () => string = () => {
    let token2 = localStorage.getItem('token');
    this.token = token2 != "undefined" ? token2 : null;
    return this.token;
  }
}
