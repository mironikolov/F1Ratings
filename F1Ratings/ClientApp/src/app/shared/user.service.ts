import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accountControlerUrl = "api/Account";

  constructor( private http: HttpClient, @Inject('BASE_URL') private baseUrl: string ) { }

  registerUser( body: object ){
    return this.http.post( `${this.baseUrl + this.accountControlerUrl}/Register`, body)
  }

  login( formData: object ){
    return this.http.post(`${this.baseUrl + this.accountControlerUrl}/Login`, formData);
  }

  getUserProfile(){
    return this.http.get(this.baseUrl + 'api/UserProfile/Details');
  }

  roleMatch( allowedRoles: Array<string> ): boolean {
    let isMatch = false;
    let payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.some(element => {
      if (userRole == element) {
        isMatch = true;
        return true;
      }
    });

    return isMatch;
  }
}
