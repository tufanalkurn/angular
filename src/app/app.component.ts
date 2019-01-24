import { Component } from '@angular/core';
import { GlobalService } from './_helpers/global.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-loader></app-loader>
    <ng-snotify></ng-snotify>
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>  
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Play Book';

  constructor(private gs: GlobalService) { }


  ngOnInit() {

    localStorage.removeItem('setting');
    
    this.gs.settings().subscribe((data: any) => {  
      localStorage.setItem('setting', JSON.stringify(data)); 
    }, (error: Response) => this.gs.handleErrors(error));        
      

  }

}
