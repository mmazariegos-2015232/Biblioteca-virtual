import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AddComponent as AddBookComponent } from './components/book/add/add.component';
import { DeleteComponent as DeleteBookComponent } from './components/book/delete/delete.component';
import { ListComponent as ListBookComponent } from './components/book/list/list.component';
import { UpdateComponent as UpdateBookComponent } from './components/book/update/update.component';
import { ViewComponent as ViewBookComponent } from './components/book/view/view.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddComponent as AddMagazineComponent } from './components/magazine/add/add.component';
import { DeleteComponent as DeleteMagazineComponent } from './components/magazine/delete/delete.component';
import { ListComponent as ListMagazineComponent } from './components/magazine/list/list.component';
import { UpdateComponent as UpdateMagazineComponent } from './components/magazine/update/update.component';
import { ViewComponent as ViewMagazineComponent } from './components/magazine/view/view.component';
import { AddComponent as AddUserComponent } from './components/user/add/add.component';
import { DeleteComponent as DeleteUserComponent } from './components/user/delete/delete.component';
import { ListComponent as ListUserComponent } from './components/user/list/list.component';
import { UpdateComponent as UpdateUserComponent } from './components/user/update/update.component';
import { ViewComponent as ViewUserComponent } from './components/user/view/view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { ViewBooksToRequestComponent } from './components/view-books-to-request/view-books-to-request.component';
import { RequestComponent as RequestBookComponent } from './components/book/request/request.component';
import { RequestComponent as RequestMagazineComponent } from './components/magazine/request/request.component';
import { ViewMagazinesToRequestComponent } from './components/view-magazines-to-request/view-magazines-to-request.component';
import { ViewBookToReturnComponent } from './components/view-book-to-return/view-book-to-return.component';
import { ViewMagazinesToReturnComponent } from './components/view-magazines-to-return/view-magazines-to-return.component';
import { ReturnComponent as ReturnBookComponent} from './components/book/return/return.component';
import { ReturnComponent as ReturnMagazineComponent} from './components/magazine/return/return.component';
import { ReportsComponent } from './components/reports/reports.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    AddUserComponent,
    AddBookComponent,
    AddMagazineComponent,
    UpdateUserComponent,
    UpdateBookComponent,
    UpdateMagazineComponent,
    ViewUserComponent,
    ViewBookComponent,
    ViewMagazineComponent,
    DeleteUserComponent,
    DeleteBookComponent,
    DeleteMagazineComponent,
    ListUserComponent,
    ListBookComponent,
    ListMagazineComponent,
    NavbarComponent,
    UserHomeComponent,
    ViewBooksToRequestComponent,
    RequestBookComponent,
    RequestMagazineComponent,
    ViewMagazinesToRequestComponent,
    ViewBookToReturnComponent,
    ViewMagazinesToReturnComponent,
    ReturnBookComponent,
    ReturnMagazineComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
