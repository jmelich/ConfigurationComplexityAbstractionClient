import {Component, Injectable} from '@angular/core';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// @Injectable()
export class AppComponent {
  constructor(private authentication: AuthenticationBasicService) {
  }
  isLoggedIn() {
    console.log('PISCO:' + this.authentication.getCurrentUser().authorization);
    return this.authentication.getCurrentUser().authorization;
  }
}
