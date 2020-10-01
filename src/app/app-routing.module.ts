import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AddComponent as AddBookComponent } from './components/book/add/add.component';
import { DeleteComponent as DeleteBookComponent } from './components/book/delete/delete.component';
import { ListComponent as ListBookComponent } from './components/book/list/list.component';
import { RequestComponent  as RequestBookComponent} from './components/book/request/request.component';
import { RequestComponent  as RequestMagazineComponent} from './components/magazine/request/request.component';
import { UpdateComponent as UpdateBookComponent } from './components/book/update/update.component';
import { ViewComponent as ViewBookComponent } from './components/book/view/view.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddComponent as AddMagazineComponent } from './components/magazine/add/add.component';
import { DeleteComponent as DeleteMagazineComponent } from './components/magazine/delete/delete.component';
import { ListComponent as ListMagazineComponent } from './components/magazine/list/list.component';
import { UpdateComponent as UpdateMagazineComponent } from './components/magazine/update/update.component';
import { ViewComponent as ViewMagazineComponent } from './components/magazine/view/view.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AddComponent as AddUserComponent } from './components/user/add/add.component';
import { DeleteComponent as DeleteUserComponent } from './components/user/delete/delete.component';
import { ListComponent as ListUserComponent } from './components/user/list/list.component';
import { UpdateComponent as UpdateUserComponent } from './components/user/update/update.component';
import { ViewComponent as ViewUserComponent } from './components/user/view/view.component';
import { ViewBooksToRequestComponent } from './components/view-books-to-request/view-books-to-request.component';
import { ViewMagazinesToRequestComponent } from './components/view-magazines-to-request/view-magazines-to-request.component';
import { ViewBookToReturnComponent } from './components/view-book-to-return/view-book-to-return.component';
import { ViewMagazinesToReturnComponent } from './components/view-magazines-to-return/view-magazines-to-return.component';
import { ReturnComponent  as ReturnBookComponent} from './components/book/return/return.component';
import { ReturnComponent  as ReturnMagazineComponent} from './components/magazine/return/return.component';
import { ReportsComponent } from './components/reports/reports.component';



 
const routes: Routes = [  
  { path: '',                       redirectTo: '**', pathMatch: 'full' },
  { path: '',                       component: HomeComponent },
  { path: 'signin',                 component: LoginComponent },
  { path: 'about',                  component: AboutComponent },
  { path: 'home',                   component: UserHomeComponent },
  { path: 'users',                  component: ListUserComponent },
  { path: 'users/add',              component: AddUserComponent },
  { path: 'users/update/:id',       component: UpdateUserComponent },
  { path: 'users/delete/:id',       component: DeleteUserComponent },
  { path: 'users/view/:id',         component: ViewUserComponent },
  { path: 'books',                  component: ListBookComponent },
  { path: 'books/add',              component: AddBookComponent },
  { path: 'books/update/:id',       component: UpdateBookComponent },
  { path: 'books/delete/:id',       component: DeleteBookComponent },
  { path: 'books/view/:id',         component: ViewBookComponent },
  { path: 'magazines',              component: ListMagazineComponent },
  { path: 'magazines/add',          component: AddMagazineComponent },
  { path: 'magazines/update/:id',   component: UpdateMagazineComponent },
  { path: 'magazines/delete/:id',   component: DeleteMagazineComponent },
  { path: 'magazines/view/:id',     component: ViewMagazineComponent },
  { path: 'users/books',            component: ViewBooksToRequestComponent },
  { path: 'users/magazines',        component: ViewMagazinesToRequestComponent },
  { path: 'books/request/:id',      component: RequestBookComponent },
  { path: 'books/return/:id',       component: ReturnBookComponent },
  { path: 'magazines/request/:id',  component: RequestMagazineComponent },
  { path: 'magazines/return/:id',   component: ReturnMagazineComponent },
  { path: 'users/books-return',     component: ViewBookToReturnComponent },
  { path: 'users/magazines-return', component: ViewMagazinesToReturnComponent },
  { path: 'reports',                component: ReportsComponent },
  { path: '**',                     component: HomeComponent }
]; 
 
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
