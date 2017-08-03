import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import {Connector} from '../connector';
import {ConnectorAvailableSettings} from './connector-available-settings';
import {ConnectorConfigService} from './connector-config.service';
import {ConnectorCurrentSettings} from './connector-current-settings';

export class CustomModalContext extends BSModalContext {
  public connector: Connector;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'app-modal-content',
  templateUrl: './custom-modal-sample.html',
  styleUrls: ['./custom-modal-sample.css'],
})

export class CustomModalComponent implements CloseGuard, ModalComponent<CustomModalContext>, OnInit{
  context: CustomModalContext;
  public availableSettings: ConnectorAvailableSettings = new ConnectorAvailableSettings();
  public currentSettings: ConnectorCurrentSettings = new ConnectorCurrentSettings();
  public errorMessage: string;
  public loadedAvailable = false;
  public loadedCurrent = false;

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>, private connectorConfigService: ConnectorConfigService) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    this.wrongAnswer = value !== 5;
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }

  ngOnInit() {
    this.connectorConfigService.getAvailableSettings(this.context.connector).subscribe(
      availableSettings => {
        this.availableSettings = availableSettings;
        this.loadedAvailable = true;
      },
      error => this.errorMessage = <any>error.message
    );
    this.connectorConfigService.getCurrentSettings(this.context.connector).subscribe(
      currentSettings => {
        this.currentSettings = currentSettings;
        this.loadedCurrent = true;
      },
      error => this.errorMessage = <any>error.message
    );
  }

  changedVLAN(option) {
    console.log('radioButtonChanged');
  }
  changedSpeed(option) {
    console.log('radioButtonChanged');
  }
  changedMode(option) {
    console.log('radioButtonChanged');
  }
  changedStatus(option) {
    console.log('radioButtonChanged');
  }
  cancel() {
    console.log('cancelled');
    this.dialog.close();
  }
}
