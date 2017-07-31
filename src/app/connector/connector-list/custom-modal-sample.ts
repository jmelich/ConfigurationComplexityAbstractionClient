import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {Connector} from '../connector';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
  public connector: Connector;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'app-modal-content',
  styles: [`
    .custom-modal-container {
      padding: 15px;
    }

    .custom-modal-header {
      background-color: #6950a1;
      color: #fff;
      -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
      box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
      margin-top: -15px;
      margin-bottom: 40px;
    }
  `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
    <div class="container-fluid custom-modal-container">
      <div class="row custom-modal-header">
        <div class="col-sm-12">
          <h1>Connector <strong>{{context.connector.title}}</strong> configuration </h1>
        </div>
      </div>
      <div class="row" [ngClass]="{'myclass' : shouldUseMyClass}">
        <div class="col-xs-12">
          <div class="jumbotron">
            <h1>Do the math to quit:</h1>
            <p class="lead">I received an injection of the number <strong>{{context.num1}}</strong> and the number <strong>{{context.num2}}</strong></p>
            <span>What is the <strong>{{context.connector.title}}</strong>?</span>
            <input class="form-control" type="text" #answer (keyup)="onKeyUp(answer.value)" autofocus>
          </div>
        </div>
      </div>
    </div>`
})
export class CustomModal implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    this.wrongAnswer = value != 5;
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }
}
