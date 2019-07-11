import {Injectable, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptorModule implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('id_token');
    console.log(idToken);
    if (req.url === 'http://localhost:3000/users' && req.method === 'POST'){
      return next.handle(req);
    }
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorModule,
      multi: true,
    },
  ],
})
export class Interceptor {}
