import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  providers: [BookService, UserService]

})
export class DeleteComponent implements OnInit {
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
      } else {
        this.getBookToDelete();
      }
    }
  }

  getBookToDelete: () => void = ()=>{
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

  deleteBook: () => void = () => {
    var deleteConfirmation = confirm("Are you sure to delete the book?");
      if (deleteConfirmation) {
        this._bookService.deleteBook(this.book._id).subscribe(
          response => {
            if (!response.message) {
              this.status = 'error';
            } else {
              this.status = 'ok';
              alert(response.message);
              this._router.navigate(["books"]);
            }
          },
          error => this.onError(error)
        );
      }
  }

  onError: (error: any) => void = (error) => {
    var errorMessage = <any>error;
    if (errorMessage != null) {
      this.status = 'error';
    }
  }

}
