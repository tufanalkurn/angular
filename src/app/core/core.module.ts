import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {LoaderService} from './loader/loader.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptor} from './loader/loader-interceptor.service';
import {FormErrorDirective} from './directives/form-error.directive';
import {BaseUrlInterceptor} from './interceptors/base-url.interceptor';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    FormErrorDirective,
  ],
  exports: [
    LoaderComponent,
    FormErrorDirective,
    NgxPermissionsModule
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
