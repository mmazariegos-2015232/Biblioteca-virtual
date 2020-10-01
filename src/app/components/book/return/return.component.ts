import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Book } from 'src/app/models/book.model';
import { UserService } from 'src/app/services/user.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  providers: [UserService, BookService]

})
export class ReturnComponent implements OnInit {
  public book: Book;
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
    private _bookService: BookService,
  ) {
    this.user = this._userService.getIdentity();
    this.book = new Book("", "", "", "", [], "", [], 0, 0);
  }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role == "admin") {
        this._router.navigate(['users']);
      } else {
        this.getBookToReturn();
      }
    }
  }


  getBookToReturn: () => void = () => {
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

  returnBook: () => void = () => {
    this._userService.returnBook(this.user._id, this.book._id).subscribe(
      response => {
        if (!response.message) {
          this.status = 'error';
        } else {
          this.status = 'ok';
          this.getBookToReturn();
          alert(response.message);
          this._router.navigate(["users/books-return"]);
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
