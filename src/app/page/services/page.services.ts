import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http'; 
 
import { GlobalService } from 'src/app/_helpers/global.service';
import { Page } from '../Page';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService
  ) {}

  getPage(slug: string) {
    return this.http.get<Page>('api/post/page?slug='+slug)
      .pipe(
        map((response: any) => {
          return response.post;
        }),
        catchError(this.gs.handleHttpError)
      );
  }
}
