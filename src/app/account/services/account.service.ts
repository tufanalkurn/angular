import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/account/models/User';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Observable, Subject } from 'rxjs';
import { Blog, Category } from '../models/Blog';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _teacheMessageSource = new Subject<string>();
  teacherMessage$ = this._teacheMessageSource.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private gs: GlobalService
  ) { }

  sendMessage(message: string) {
    this._teacheMessageSource.next(message);
  }

  profile() {
    return this.http.get('api/user/profile')
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }

  updateProfile(data) {
    return this.http.put('api/user/update', data)
      .pipe(
        map((response: Response) => response)
      );
  }

  getUserDetails(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  changedPassword(data) {
    return this.http.post('api/user/change-password', data)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }

  plans() {
    return this.http.get('api/user/plans')
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }

  executeAgreement(token) {
    return this.http.post('api/user/execute-agreement', token)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }
  
  switchAgreement(plan) {
    return this.http.post('api/user/switch-agreement', plan)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }

  cancelAgreement(){
    return this.http.get('api/user/cancel-agreement')
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  } 

  listCategory() {
    return this.http.get<Category>('api/post/category')
      .pipe(
        catchError(this.gs.handleHttpError)
      );
  }

  viewCategory(slug: string) {
    return this.http.get<Category>('api/post/category-view?slug='+slug)
  }

  getArticle(slug: string) {
    return this.http.get<Category>('api/post/view?slug='+slug)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }
   

}
