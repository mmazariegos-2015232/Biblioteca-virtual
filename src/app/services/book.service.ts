import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url:       string;
  private identity:  any;
  private token:     string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService,  
  ) {
    this.url = GLOBAL.apiUrl;
  }

  createBook: (book: Book) => Observable<any> = (book) => {
    let params = JSON.stringify(book);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.post(`${this.url}/books`, params, { headers: headers });
  }

  updateBook: (book: Book) => Observable<any> = (book) => {
    let params = JSON.stringify(book);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.put(`${this.url}/books/${book._id}`, params, { headers: headers });
  }

  deleteBook: (bookId: string) => Observable<any> = (bookId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.delete(`${this.url}/books/${bookId}`, { headers: headers });
  }

  getBook: (bookId: string) => Observable<any> = (bookId) => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(`${this.url}/books/${bookId}`, { headers: headers });
  }

  listBooks: () => Observable<any> = () => {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this._userService.getToken());
    return this._http.get(`${this.url}/books`, { headers: headers });
  }
}

