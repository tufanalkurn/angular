import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.isLoggedIn) {
            // add authorization header with jwt token if available        
            const authToken = this.authService.getAuthorizationToken();
            // console.log(token);
            if (authToken) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authToken}`,
                        'WWW-Authenticate': 'Bearer realm="api"'
                    },
                });
            }
        }

        return next.handle(req);

    }
}