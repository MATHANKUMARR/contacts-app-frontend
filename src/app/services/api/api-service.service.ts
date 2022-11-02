import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  API = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  // User
  getAllUsers(): Observable<any> {
    return this.http.get(this.API + "users");
  }

  getUserById(id:any): Observable<any> {
    return this.http.get(this.API + "users/" + id);
  }

  patchUser(userId:any,payload:any): Observable<any> {
    return this.http.patch(this.API + "users/" + userId, payload);
  }

  deleteUser(userId:any): Observable<any> {
    return this.http.delete(this.API + "users/" + userId);
  }

  // Contacts 
  addContact(payload:any): Observable<any> {
    return this.http.post(this.API + "contacts",payload);
  }

  getAllContact(): Observable<any> {
    return this.http.get(this.API + "contacts");
  }

  getContact(userid:any):Observable<any> {
    return this.http.get(this.API + "contacts/phoneNo/" + userid);
  }

  postContact(payload:any):Observable<any> {
    return this.http.post(this.API + "contacts", payload);
  }

  patchContact(userId:any,payload:any):Observable<any> {
    return this.http.patch(this.API + "contacts/" + userId, payload);
  }

  // Address
  addAddress(payload:any): Observable<any> {
    return this.http.post(this.API + "address",payload);
  }

  getAllAddress(): Observable<any> {
    return this.http.get(this.API + "address");
  }

  getAddress(userid:any):Observable<any> {
    return this.http.get(this.API + "address/" + userid);
  }

  postAddress(payload:any):Observable<any> {
    return this.http.post(this.API + "address", payload);
  }

  patchAddress(addressId:any,payload:any):Observable<any> {
    return this.http.patch(this.API + "address/" + addressId, payload);
  }

  // Department
  addDepartment(payload:any): Observable<any> {
    return this.http.post(this.API + "departments",payload);
  }

  getAllDepartment(): Observable<any> {
    return this.http.get(this.API + "departments");
  }

  getDepartment(id:any):Observable<any> {
    return this.http.get(this.API + "departments/" + id);
  }

  postDepartment(payload:any):Observable<any> {
    return this.http.post(this.API + "departments", payload);
  }

  patchDepartment(departmentId:any,payload:any):Observable<any> {
    return this.http.patch(this.API + "departments/" + departmentId, payload);
  }
}
