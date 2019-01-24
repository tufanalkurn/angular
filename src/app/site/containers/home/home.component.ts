import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/account/models/User';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/_helpers/global.service';
import { Title } from '@angular/platform-browser';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "Home";
  user: User;
  testimonial = [];
  error = [];
  isLoggedIn$: Observable<boolean>;

  loggedUser$: Observable<User>;
  
  showNavigationArrows = false;
  showNavigationIndicators = false;
  isCollapsed = true;

  constructor(
    config: NgbCarouselConfig,
    private authService: AuthService,
    private router: Router,
    private siteService: SiteService,
    private gs: GlobalService,
    private titleService: Title
    ) {
    config.showNavigationArrows = false;
  }

  images = [1, 2, 3].map(() => `https://picsum.photos/200/200?random&t=${Math.random()}`);

  ngOnInit() {
    this.titleService.setTitle(this.gs.mainTitle + ' | ' + this.title);
    this.isLoggedIn$ = this.authService.authenticationState;
    this.loggedUser$ = this.authService.loggedUserState;
    this.loggedUser$.pipe().subscribe((data: User) => {
      this.user = data;
    });

    this.siteService.testimonial().subscribe(
      (data: any) =>this.testimonial = data.result,
      error => this.error = error
    );

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
