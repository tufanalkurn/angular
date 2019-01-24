import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient} from '@angular/common/http'; 
 
import { GlobalService } from 'src/app/_helpers/global.service';
import { Page } from '../models/Page';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private gs: GlobalService
  ) {}


  page(slug) {
    return this.http.get('api/user/page?slug'+slug)
      .pipe(
        map((response: any) => {
            console.log(response);
          return response;
        }),
        catchError(this.gs.handleHttpError)
      );
    
  } 

}
