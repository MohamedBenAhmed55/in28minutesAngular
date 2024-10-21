import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../app.constants';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`)
    // console.log("Execute Hello World Bean Service")
  }

  executeHelloWorldServiceWithPathVariable(name: string) {
    // let basicAuthHeaderString = this.createBasicAuthHttpHeader()
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })
    // return this.http.get<HelloWorldBean>('${API_URL}/hello-world/path-variable/{name}')
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`
      // , { headers }
    )
  }

  // createBasicAuthHttpHeader() {
  //   let username = 'in28minutes'
  //   let password = 'dummy'
  //   let basicAuthHeaderString = ('Basic ' + window.btoa(username + ':' + password));
  //   return basicAuthHeaderString
  // }
}
