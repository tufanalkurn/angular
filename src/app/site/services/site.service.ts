import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
    ) { }

    register(data: Users) {
      return this.http.post('api/user/signup', data)
        .pipe(map((response: Response) => response));
    }

    forgotPassword(data: Users) {
      return this.http.post('api/user/request-password-reset', data)
      .pipe(map((response: Response) => response));
    }

    resetPassword(token) {
      return this.http.post('api/user/reset-password', token)
      .pipe(map((response: Response) => response));
    }

    contactForm(data) {
      return this.http.post('api/user/contact', data)
      .pipe(map((response: Response) => response));
    }

    testimonial() {
      return this.http.get('api/post/testimonial')
      .pipe(map((response: Response) => response));
    }

    promo(code) {
      return this.http.post('api/user/promo', {'promo':code})
      .pipe(map((response: Response) => response));
    }

}
