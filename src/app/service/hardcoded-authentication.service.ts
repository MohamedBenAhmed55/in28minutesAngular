import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    if (username === 'in28Minutes' && password === 'dummy') {
      sessionStorage.setItem('authenticatedUser', username)
      return true
    }
    return false
  }

  isUserLoggedIn() {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('authenticatedUser') !== null;
    }
    return false;
  }


  logout() {
    sessionStorage.removeItem('authenticatedUser')
  }
}
