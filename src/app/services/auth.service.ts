import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  static getUserToken() {
    return localStorage.getItem('userTokenOurApp');
  }

  public setUserToken(token: string) {
    localStorage.setItem('userTokenOurApp', token);
  }

  public checkUserSession() {
    console.log(AuthService.getUserToken())
    if (AuthService.getUserToken()) {
      return true;
    }
    return false;
  }


}
