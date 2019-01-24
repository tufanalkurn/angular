import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/account/models/User';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  public userName = null;

  isLoggedIn$: Observable<boolean>;

  loggedUser$: Observable<User>;

  isCollapsed = true; 
  
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.authenticationState;
    this.loggedUser$ = this.authService.loggedUserState;
    
    this.loggedUser$.pipe().subscribe((data: User) => {
      this.user = data;
    });

    if(this.isLoggedIn$) {
        this.userName = this.user.userProfile.full_name;
    }
    this.accountService.teacherMessage$
      .subscribe(
        message => {
          if (message === 'Good Morning') {
            const rest = localStorage.getItem('user');
            const edObject = JSON.parse(rest);
            this.userName = edObject.userProfile.full_name;
            //alert(this.userName);
          } 
        }
      );

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);  
  }
  modifyUserName(){    
        const rest = localStorage.getItem('user');
        const edObject = JSON.parse(rest);
        this.userName = edObject.userProfile.full_name;
  }

  
}
