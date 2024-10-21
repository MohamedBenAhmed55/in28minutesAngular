import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {


  message = 'Some Welcome Message'
  welcomeMessageFromService:string | undefined;
  name = ''

  constructor(private route: ActivatedRoute, private service:WelcomeDataService) {

  }
  ngOnInit() {
    // console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      // response => console.log(response.message)
    );
    // throw new Error('Method not implemented.');
  }
  handleErrorResponse(error: any) {
    // console.log(error);
    // console.log(error.error)
    // console.log(error.error.message)
    this.welcomeMessageFromService = error.error.message
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromService = response.message
    console.log(response)
    console.log(response.message)
  }

  getWelcomeMessageWithParameter() {
    console.log(this.service.executeHelloWorldServiceWithPathVariable(this.name));
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
      // response => console.log(response.message)
    );
    // throw new Error('Method not implemented.');
  }

}
