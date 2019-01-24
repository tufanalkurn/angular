import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Role } from 'src/app/account/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authServices: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authServices.isAuthenticated()) {

      // check if route is restricted by role
      
      const role = localStorage.getItem('role');
      if (next.data.roles && next.data.roles.indexOf(role) === -1) {
          // role not authorised so redirect to home page
          this.router.navigate(['/']);
          return false;
      }else if( role == Role.User ){
        this.router.navigate(['/membership']);
        return false;
      }

      return true;
    }
    this.router.navigate(['/login']);
    return false; 
  }
}
