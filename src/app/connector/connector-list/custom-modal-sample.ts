import {Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Connector } from '../connector';
import { ConnectorAvailableSettings } from './connector-available-settings';
import { ConnectorConfigService } from './connector-config.service';
import { ConnectorCurrentSettings } from './connector-current-settings';
import { ToastsManager } from 'ng2-toastr';

export class CustomModalContext extends BSModalContext {
  public connector: Connector;
}


@Component({
  selector: 'app-modal-content',
  templateUrl: './custom-modal-sample.html',
  styleUrls: ['./custom-modal-sample.css'],
})

export class CustomModalComponent implements CloseGuard, ModalComponent<CustomModalContext>, OnInit {
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
  public directory: string;
  public certify: boolean;
  public saveChecked = true;

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>,
              private connectorConfigService: ConnectorConfigService,
              public toastr: ToastsManager) {
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
        this.directory = currentSettings.runningDirectory;
      },
      error => this.errorMessage = <any>error.message
    );
  }

  changedVLAN(opt) {
    this.vlanOption = opt;
  }

  changedSpeed(opt) {
    if (opt === '1G') {
      opt = '1000';
    }
    this.speedOption = opt.toLowerCase();
  }

  changedMode(opt) {
    opt = opt.toLowerCase();
    this.modeOption = opt;
  }

  changedStatus(opt) {
    this.statusOption = opt;
  }

  cancel() {
    this.dialog.close();
  }

  submit() {
    this.submitSettings();
    this.dialog.close();
  }

  submitSettings() {
    this.toastr.info('Saving Configuration, wait for the Success Message');
    this.setStatus();
  }

  setStatus() {
    if (this.statusOption) {
      this.connectorConfigService.setConnectorStatus(this.context.connector, this.statusOption).subscribe(
        response => {this.setMode(); },
        error => {this.errorMessage = <any>error.message; this.toastr.error('Error'); }
      );
    }else {
      this.setMode();
    }

  }

  setMode() {
    if (this.modeOption ) {
      this.connectorConfigService.setConnectorMode(this.context.connector, this.modeOption).subscribe(
        response => {this.setSpeed(); },
        error => {
          this.errorMessage = <any>error.message;
          this.toastr.error('Incompatible Speed With Duplex Mode');
        }
      );
    }else {
      this.setSpeed();
    }

  }

  setSpeed() {
    if (this.speedOption) {
      this.connectorConfigService.setConnectorSpeed(this.context.connector, this.speedOption).subscribe(
        response => {this.setVLAN(); },
        error => {
          this.errorMessage = <any>error.message;
          this.toastr.error('Incompatible Speed With Duplex Mode');
        }
      );
    }else {
      this.setVLAN();
    }

  }

  setVLAN() {
    if (this.vlanOption) {
      this.connectorConfigService.setConnectorVLAN(this.context.connector, this.vlanOption).subscribe(
        response => {this.saveConfig(); },
        error => {this.errorMessage = <any>error.message; this.toastr.error('Error'); }
      );
    }else {
      this.saveConfig();
    }

  }

  saveConfig() {
    if (this.saveChecked) {
      this.connectorConfigService.saveConfig(this.context.connector, this.directory, this.certify).subscribe(
        response => {this.toastr.success('Config saved in specified directory (Click to close)', null, {dismiss: 'click'}); },
        error => {this.errorMessage = <any>error.message; this.toastr.error('Error'); }
      );
    }else {
      this.toastr.success('Config applied but not saved in a directory');
    }
  }
}
