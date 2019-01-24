import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Module
import {CoreModule} from './core/core.module';
import {LaddaModule} from './ladda/ladda.module';
import { UiModule } from './ui/ui.module';
import { SiteModule } from './site/site.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { PageModule } from './page/page.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './site/containers/home/home.component';
import { NotFoundComponent } from './site/components/not-found/not-found.component';  
import { GlobalService } from './_helpers/global.service';
import { NgxStripeModule } from 'ngx-stripe';
import { httpInterceptorProviders } from './_helpers/index';

 
 

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    DemoMaterialModule,
    SnotifyModule,
    CoreModule,
    LaddaModule,
    NgbModule,
    UiModule,
    SiteModule,
    AuthModule,
    AccountModule,
    PageModule,
    NgxStripeModule.forRoot('pk_test_M1acFRJ9PtPrF66NigyTvRwf')
  ],
  providers: [  
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},   
    SnotifyService,GlobalService,httpInterceptorProviders
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
