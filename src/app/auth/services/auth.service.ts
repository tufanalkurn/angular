import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/account/models/User';
import { GlobalService } from 'src/app/_helpers/global.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  private loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserDetails());

  authenticationState = this.loggedIn.asObservable();

  loggedUserState = this.loggedUser.asObservable(); 
  
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private gs: GlobalService
  ) {}

  login(credentials) {
    return this.http.post<any>('api/user/login', credentials)
      .pipe(
        map((response: any) => {
          this.isLoggedIn = true;
          this.loggedIn.next(true);
          this.loggedUser.next(Object.assign({}, response.user));
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
  }
 

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    this.loggedUser.next(new User);
    this.loggedIn.next(false);
    this.isLoggedIn = false;
  }

  getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !this.jwtHelper.isTokenExpired(this.getAuthorizationToken());
  }

  expirationTokenDate() {
    return this.jwtHelper.getTokenExpirationDate(this.getAuthorizationToken());
  }

  decode() {
    return this.jwtHelper.decodeToken(this.getAuthorizationToken());
  }

  getUserDetails(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
