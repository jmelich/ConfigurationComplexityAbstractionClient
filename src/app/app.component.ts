import {Component, Injectable, ViewContainerRef} from '@angular/core';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// @Injectable()
export class AppComponent {
  constructor(private authentication: AuthenticationBasicService,
              public toastr: ToastsManager,
              vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  isLoggedIn() {
    return this.authentication.getCurrentUser().authorization;
  }
}
