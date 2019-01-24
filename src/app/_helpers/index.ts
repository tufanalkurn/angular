import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthJwtInterceptor } from './auth.jwt.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true }
];