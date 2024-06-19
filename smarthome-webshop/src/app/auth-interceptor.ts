import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AccountService } from './shared/account.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshing: boolean = false
  constructor(
    private accService: AccountService,
  ) { }

  private handleAuthError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.refreshing) {
      if (err.status == 401 || err.status == 403) {
        this.refreshing = true
        return this.accService.refreshLogin().pipe(
          switchMap((token) => {
            this.refreshing = false
            return next.handle(req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token.access) }))
          }),
          catchError((err) => {
            this.refreshing = false
            this.accService.logout()
            return throwError(err)
          })
        );
      }
    }
    return throwError(err)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/api/')) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem("access") || "") })
      console.log("auth intercept")
    }

    return next.handle(req).pipe(catchError(x => this.handleAuthError(x, req, next)))
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];