import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export const AUTHENTICATED_USER = 'authenticatedUser'
export const TOKEN = 'token'

@Injectable({
    providedIn: 'root'
})
export class BasicAuthenticationService {

    constructor(private http: HttpClient) { }

    executeAuthenticationService(username: string, password: string) {
        let basicAuthHeaderString = ('Basic ' + window.btoa(username + ':' + password));

        let headers = new HttpHeaders({
            Authorization: basicAuthHeaderString
        })
        return this.http.get<AuthenticationBean>(
            `http://localhost:8080/basicauth`,
            { headers }).pipe(
                map(
                    data => {
                        sessionStorage.setItem(AUTHENTICATED_USER, username)
                        sessionStorage.setItem(TOKEN, basicAuthHeaderString)
                        return data;
                    }
                )
            )
    }


    isUserLoggedIn() {
        if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
            return sessionStorage.getItem(AUTHENTICATED_USER)
        }
        return false;
    }

    getAuthenticatedUser() {
        return sessionStorage.getItem(AUTHENTICATED_USER)

    }

    getAuthenticatedToken() {
        if (this.getAuthenticatedUser()) {
            return sessionStorage.getItem(TOKEN)
        }
        return;
    }


    logout() {
        sessionStorage.removeItem(AUTHENTICATED_USER)
        sessionStorage.removeItem(TOKEN)
    }
}

export class AuthenticationBean {
    constructor(public message: string) { }
}