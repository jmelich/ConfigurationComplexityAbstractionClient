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

  public vlanOption: string;
  public speedOption: string;
  public modeOption: string;
  public statusOption: string;

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

  changedVLAN(opt) {
    this.vlanOption = opt;
    console.log(opt);
  }
  changedSpeed(opt) {
    if (opt === '1G') {
      opt = '1000';
    }
    this.speedOption = opt.toLowerCase();
    console.log(opt);
  }
  changedMode(opt) {
    opt = opt.toLowerCase();
    this.modeOption = opt;
    console.log(opt);
  }
  changedStatus(opt) {
    this.statusOption = opt;
    console.log(opt);
  }
  cancel() {
    console.log('cancelled');
    this.dialog.close();
  }
  submit() {
    this.submitSettings();
    console.log('submitted');
    this.dialog.close();
  }
  submitSettings() {
    if (this.statusOption) { this.setStatus(); }
    if (this.modeOption) { this.setMode(); }
    if (this.speedOption) { this.setSpeed(); }
    if (this.vlanOption) { this.setVLAN(); }
  }
  setStatus() {
    this.connectorConfigService.setConnectorStatus(this.context.connector, this.statusOption).subscribe(
      response => {},
      error => this.errorMessage = <any>error.message
    );
  }
  setMode() {
    this.connectorConfigService.setConnectorMode(this.context.connector, this.modeOption).subscribe(
      response => {},
      error => this.errorMessage = <any>error.message
    );
  }
  setSpeed() {
    this.connectorConfigService.setConnectorSpeed(this.context.connector, this.speedOption).subscribe(
      response => {},
      error => this.errorMessage = <any>error.message
    );
  }
  setVLAN() {
    this.connectorConfigService.setConnectorVLAN(this.context.connector, this.vlanOption).subscribe(
      response => {},
      error => this.errorMessage = <any>error.message
    );
  }

}
