import { Component, OnInit } from '@angular/core';
import { Page } from '../../Page';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageService } from '../../services/page.services';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/_helpers/global.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/account/models/User';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  title = "Content Page";

  isLoggedIn$: Observable<boolean>;

  loggedUser$: Observable<User>;
  
  showNavigationArrows = false;
  showNavigationIndicators = false;
  isCollapsed = true;
  

  error: {};
  page: Page;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private authService: AuthService,
    private titleService: Title,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    //this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.isLoggedIn$ = this.authService.authenticationState;
    this.loggedUser$ = this.authService.loggedUserState;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.pageService.getPage(params.get('slug'))
      )
    ).subscribe(
      (data: Page) => {
        this.page = data;
        this.titleService.setTitle(this.gs.mainTitle + ' | ' + data.title);
      }, error => this.error = error
    );

  }
  
}
