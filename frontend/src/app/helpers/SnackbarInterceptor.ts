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

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(e => {
        if (request.method == "POST" || request.method == "PUT")
          if (e instanceof HttpResponse && e.status == 200) {
            this.snackBar.open('Saved successfully.', 'close', { duration: 2000, panelClass: 'successSnack' });
          }
      }),
      catchError(error => {
        this.snackBar.open('Une erreur est survenue', 'Fermer', { duration: 2000, panelClass: 'errorSnack' });
        return throwError(error);
      })
    );
  }
}
