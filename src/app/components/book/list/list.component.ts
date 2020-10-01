import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [BookService, UserService],
})
export class ListComponent implements OnInit {
  public books:  Book[];
  public status: string;

  constructor(
    private _bookService: BookService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    if (!this._userService.getIdentity() || !this._userService.getToken()) {
      this._router.navigate(['']);
    } else {
      if (this._userService.getIdentity().role != "admin") {
        this._router.navigate(['home']);
      } else {
        this.listBooks();
      }
    }
  }

  listBooks: () => void = () => {
    this._bookService.listBooks().subscribe(
      response => {
        if (response.books.length == 0) {
          this.status = "error";
        } else {
          this.books = response.books;
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
