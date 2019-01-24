import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpErrorResponse, HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import { SnotifyService } from 'ng-snotify';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GlobalService {
    public apiHost: string;
    public errors = [];
    public setting: any = {};
    public mainTitle = "Playbook";
    public basePath:string;
    public videoPath:string;

    constructor(private snotifyService: SnotifyService, private router: Router, private http: HttpClient) {
        this.apiHost = environment.apiUrl; 
        this.basePath = environment.apiUrl; 
        this.videoPath = environment.apiUrl + '/uploads/storage/'; 
    }

    public clearErrorMessages() {
        this.errors = [];
    }

    public siteTitle() {
      this.mainTitle;
    }

    public handleHttpError(error: HttpErrorResponse) {
      return throwError(error || 'Server Error');
    }

    public handleErrors(error: any) {

        const httpErrorCode = error.status;

        this.clearErrorMessages();
        switch (httpErrorCode) {
          case 401:
            const msg = error.error.data.validation_messages.serverErrorMessage;
            for (const msg1 in msg) {
              this.errors.push(msg[msg1]);
            }
            this.snotifyService.error('Your request was made with invalid credentials.', {showProgressBar: false});
            break;
          case 403:
            this.router.navigateByUrl('/account');
            break;
          case 422:
            const messages = error.error.validation_messages;
            for (const message in messages) {
              if (messages[message]) {
                this.errors.push(messages[message].join(''));
              }
            }
            this.snotifyService.warning('Form contains errors', {showProgressBar: false});
            break;
          default:
            this.snotifyService.error('An error occurred while processing your request.', {showProgressBar: false});
        }
      } 

      msg(code, msg){
        (code == 'failed') ?
        this.snotifyService.error(msg, { showProgressBar: false }) 
        : this.snotifyService.success(msg, { showProgressBar: false });   
      }

      upload(fileToUpload: File): Observable<boolean> {

        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
                
        return this.http.post('api/user/upload', formData).pipe(
          map((response: any) => {
            return response;
          }),
          catchError(this.handleHttpError)
        );
      }

      settings() {
        return this.http.get('api/user/settings').pipe(
          map((response: any) => {
            return response;
          }),
          catchError(this.handleHttpError)
        );

      }
}
