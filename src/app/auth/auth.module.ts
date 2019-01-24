import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './../material-module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { CoreModule } from '../core/core.module';
import { LaddaModule } from '../ladda/ladda.module';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { GlobalService } from '../_helpers/global.service';

const router: Routes = [
  { path: 'login', component: LoginComponent }
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DemoMaterialModule,
    CoreModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 30
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelistedDomains
      }
    }),
    RouterModule.forRoot(router)
  ],
  declarations: [LoginComponent],
  exports: [],
  providers: [
    AuthService,
    AuthGuardGuard    
  ]
})
export class AuthModule { }

