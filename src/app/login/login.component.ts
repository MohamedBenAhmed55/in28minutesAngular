// import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  username = 'in28Minutes'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Router -- Dependency Injection

  constructor(
    private router: Router,
    private hardcodedAtuhetnicationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService) {

  }

  ngOnInit() {
  }


  handleLogin() {
    if (this.hardcodedAtuhetnicationService.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
        }
      )
  }

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executJWTeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
        }
      )
  }

}
