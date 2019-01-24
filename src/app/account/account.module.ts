import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './../material-module';
import { UiModule } from '../ui/ui.module';
import { EmbedVideo } from 'ngx-embed-video';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from '../ladda/ladda.module';
import { AuthGuardGuard } from '../auth/guards/auth-guard.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardLayoutComponent } from '../ui/containers/dashboard-layout/dashboard-layout.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { MembershipComponent } from './components/membership/membership.component';
import { BlogCategoryComponent } from './components/blog-category/blog-category.component';
import { BlogArticleComponent } from './components/blog-article/blog-article.component';
import { Role } from './models/User';
import { HeaderComponent } from '../ui/components/header/header.component';


const router: Routes = [
  {
    path: 'account',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuardGuard], data: {roles: [Role.Coache, Role.Promo]} },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
      { path: 'membership', component: MembershipComponent, canActivate: [AuthGuardGuard], data: {roles: [Role.Coache, Role.Promo]}},
      { path: 'blog/:slug', component: BlogCategoryComponent, canActivate: [AuthGuardGuard], data: {roles: [Role.Coache, Role.Promo]} },
      { path: 'blog/:slug/:slug', component: BlogArticleComponent, canActivate: [AuthGuardGuard], data: {roles: [Role.Coache, Role.Promo]} },
    ],
    canActivate: [AuthGuardGuard]
  },
];

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(router),
    MatNativeDateModule,
    DemoMaterialModule,
    EmbedVideo.forRoot(),
    NgxStripeModule.forRoot('pk_test_M1acFRJ9PtPrF66NigyTvRwf'),
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
  ],
  declarations: [DashboardComponent, ChangePasswordComponent, UpdateProfileComponent, MembershipComponent, BlogCategoryComponent, BlogArticleComponent],
  providers: [DatePipe, HeaderComponent]
})
export class AccountModule { }
