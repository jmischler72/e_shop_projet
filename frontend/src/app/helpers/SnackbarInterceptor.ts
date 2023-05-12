import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AlertService} from "../services/alert/alert.service";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private authService: AuthService ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].includes(err.status) && this.authService.isLoggedIn()) {
          // auto logout if 401 or 403 response returned from api
          this.authService.logout();
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        this.snackBar.open(error,'Fermer', { duration: 2000, panelClass: 'errorSnack' })
        return throwError(() => error);
      })
    );
  }
}
