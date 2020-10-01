import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [BookService, UserService]
})
export class AddComponent implements OnInit {
  public book:    Book;
  public status:  string;
  public themesStr = {
    themes: ""
  };
  public keywordsStr = {
    keywords: ""
  };

  constructor(
    private _bookService: BookService,
    private _userService: UserService,
    private _router:      Router
  ) {
    this.book = new Book("", "", "", "", [], "", [], 0, 0);
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

  addBook: () => void = () => {
    this.themesStr.themes.split(",").forEach((theme) => {
      this.book.themes.push(theme.trim());
    });
    this.keywordsStr.keywords.split(",").forEach((keyword) => {
      this.book.keywords.push(keyword.trim());
    })
    this._bookService.createBook(this.book).subscribe(
      response => {
        if (!response.book) {
          this.status = 'error';
        } else {
          this.status = "ok";
          this.book =  new Book("", "", "", "", [], "", [], 0, 0);
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
