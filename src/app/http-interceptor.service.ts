import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error("Error from the server", error);
                return throwError(() => error);
            })
        )
    }
}

export const HttpErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
}