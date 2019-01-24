import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './../material-module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStripeModule } from 'ngx-stripe';

import { SiteService } from './services/site.service';
import { HomeComponent } from './containers/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from '../ladda/ladda.module';
import { MembershipComponent, DialogOverview } from './components/membership/membership.component';

const router: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'site/reset-password?token=:token', component: ResetPasswordComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(router),
    MatNativeDateModule,
    DemoMaterialModule,
    NgxCaptchaModule,
    NgxStripeModule.forRoot('pk_test_M1acFRJ9PtPrF66NigyTvRwf'),
    LaddaModule,
    NgbModule
  ],
  declarations: [ HomeComponent,
                  AboutComponent,
                  ContactComponent,
                  FaqsComponent,
                  ForgotPasswordComponent,
                  NotFoundComponent,
                  RegisterComponent,
                  ResetPasswordComponent,
                  MembershipComponent, DialogOverview
                ],
  exports: [],
  entryComponents: [DialogOverview],
  providers: [
    SiteService
  ]
})
export class SiteModule { }
