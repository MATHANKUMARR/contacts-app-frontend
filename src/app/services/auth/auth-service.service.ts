import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppInterceptorService } from '../app-interceptor/app-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = "http://localhost:8080/";

  constructor(private http:HttpClient, private router:Router) { }

  login(data : any):Observable<any>{
    return this.http.post( this.baseUrl + "authenticate", data);
  }

  logout(){
    AppInterceptorService.accessToken = '';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  register(payload:any):Observable<any>{
    return this.http.post(this.baseUrl + "register", payload);
  }

  isUserAvailable(){
    if(AppInterceptorService.accessToken.length > 0 || localStorage.getItem('accessToken')?.length! > 0){
      return false;
    }
    return true;
  }
}