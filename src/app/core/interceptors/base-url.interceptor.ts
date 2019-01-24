import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const apiRequest = request.clone({
      url: `${environment.apiUrl}/${request.url}`
    });

    return next.handle(apiRequest);
  }
}
