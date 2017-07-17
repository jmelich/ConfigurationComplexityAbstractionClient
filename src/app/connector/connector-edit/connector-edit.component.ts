import { Component, OnInit } from '@angular/core';
import { Connector } from '../connector';
import { ActivatedRoute } from '@angular/router';
import { ConnectorService } from '../connector.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {FloorService} from '../../floor/floor.service';
import {Floor} from '../../floor/floor';


@Component({
  selector: 'app-connector-edit',
  templateUrl: './connector-edit.component.html',
  styleUrls: ['./connector-edit.component.css']
})
export class ConnectorEditComponent implements OnInit {
  public connector: Connector = new Connector();
  public floors: Floor[] = [];
  public floor: Floor = new Floor();
  public errorMessage: string;
  public connectorForm: FormGroup;
  public titleCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private connectorService: ConnectorService,
              private floorService: FloorService,
              private router: Router) {
    this.connectorForm = fb.group({
      'title': ['Connector title', Validators.required],
      'description' : ['Connector description'],
      'isInFloor'  : ['Connector floor']
    });
    this.titleCtrl = this.connectorForm.controls['title'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/connectors/${id}`;
        this.connectorService.getConnector(uri).subscribe(
          connector => {
            this.connector = connector;
            const uri_floor = `/connectors/${id}/isInFloor`;
            this.floorService.getFloor(uri_floor).subscribe(
              floor => this.floor = floor
            );
            },
          error => this.errorMessage = <any>error.message,
        );
      });

    this.floorService.getAllFloors().subscribe(
      floors => { this.floors = floors; },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.connectorService.updateConnector(this.connector)
      .subscribe(
        connector => { this.router.navigate([connector.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
