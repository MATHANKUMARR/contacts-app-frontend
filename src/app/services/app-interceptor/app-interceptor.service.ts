import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor{

  static accessToken = '';

  _accessToken = localStorage.getItem("accessToken")!;

  refresh = false;

  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      let token = req.clone({
        setHeaders : {
          Authorization : 'Bearer ' + AppInterceptorService.accessToken
        }
      });

      return next.handle(token).pipe(catchError((err:any) =>{
        if(err.status == 401 && !this.refresh){
          this.refresh = true;
          AppInterceptorService.accessToken = this._accessToken;

          return next.handle(token.clone({
            setHeaders: {
              Authorization : 'Bearer ' + AppInterceptorService.accessToken
            }
          }));
        }
        this.refresh = false;
        return throwError(() => err);
      }));
  }
}
