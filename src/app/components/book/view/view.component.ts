import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [BookService, UserService]

})
export class ViewComponent implements OnInit {
  public book: Book;
  public status: string;
  public themesStr = {
    themes: ""
  };
  public keywordsStr = {
    keywords: ""
  };

  constructor(
    private _router: Router,
    private _bookService: BookService,
    private _userService: UserService
  ) { 
    this.book = new Book("", "", "", "", [], "", [], 0, 0);
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['home']);
      }else{
        this.getBookToView();
      }
    }
  }

  getBookToView: () => void = ()=>{
    var bookId: string = this._router.url.split('/').pop();
    this._bookService.getBook(bookId).subscribe(
      response => {
        if (!response.book) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.book = response.book;
          this.themesStr.themes = this.book.themes.join(", ");
          this.keywordsStr.keywords = this.book.keywords.join(", ");
        }
      },
      error => this.onError(error)
    );
  }

  getBook: () => void = () => {
    this.book.themes = [];
    this.book.keywords = [];
    this.themesStr.themes.split(",").forEach((theme) => {
      this.book.themes.push(theme.trim());
    });
    this.keywordsStr.keywords.split(",").forEach((keyword) => {
      this.book.keywords.push(keyword.trim());
    })
    this._bookService.updateBook(this.book).subscribe(
      response => {
        if (!response.book) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.getBookToView();
          alert(response.message);
          this._router.navigate(["book"]);
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
