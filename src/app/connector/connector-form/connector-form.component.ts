import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Connector } from '../connector';
import { ConnectorService } from '../connector.service';
import { Router } from '@angular/router';
import { FloorService } from '../../floor/floor.service';
import {Floor} from '../../floor/floor';

import { UpdateConnectorService } from '../update.connector.service';

@Component({
  selector: 'app-connector-form',
  templateUrl: './connector-form.component.html',
  styleUrls: ['./connector-form.component.css']
})
export class ConnectorFormComponent implements OnInit {
  public connector: Connector;
  public floors: Floor[] = [];
  public connectorForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private floorService: FloorService,
              private updateService: UpdateConnectorService,
              private connectorService: ConnectorService) {
    this.connectorForm = fb.group({
      'title': ['Connector title', Validators.required],
      'description' : ['Connector description'],
      'isInFloor'  : ['Connector floor'],
      'numberOfPorts' : ['Number of Ports'],
    });
    this.titleCtrl = this.connectorForm.controls['title'];
    this.connector = new Connector();
  }

  ngOnInit() {
    this.floorService.getAllFloors().subscribe(
      floors => { this.floors = floors; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.connectorService.addConnector(this.connector)
      .subscribe(
        connector => {
          this.updateService.announceConnector(connector);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    console.log(this.connector.uri);
    this.connector = new Connector;
  }
}
