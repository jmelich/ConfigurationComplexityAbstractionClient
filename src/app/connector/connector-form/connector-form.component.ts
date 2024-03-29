import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Connector } from '../connector';
import { ConnectorService } from '../connector.service';
import { FloorService } from '../../floor/floor.service';
import { Floor } from '../../floor/floor';
import { ImgMapComponent } from 'ng2-img-map';

import { UpdateConnectorService } from '../update.connector.service';

@Component({
  selector: 'app-connector-form',
  templateUrl: './connector-form.component.html',
  styleUrls: ['./connector-form.component.css']
})
export class ConnectorFormComponent implements OnInit {
  @Input() floor: Floor;
  public connector: Connector;
  public floors: Floor[] = [];
  public connectorForm: FormGroup;
  public titleCtrl: AbstractControl;
  public errorMessage: string;
  public showForm: any = false;

  @ViewChild('imgMap')
  imgMap: ImgMapComponent;
  markers: number[][] = [[0, 0]];

  onMark(marker: number[]) {
    console.log('Markers', this.markers);
    this.markers = [marker];
  }

  onChange(marker: number[]) {
    console.log('Marker', marker);
  }

  selectMarker(index: number) {
    this.imgMap.markerActive = index;
    this.imgMap.draw();
  }

  removeMarker(index: number) {
    this.markers.splice(index, 1);
    if (index === this.imgMap.markerActive) {
      this.imgMap.markerActive = null;
    } else if (index < this.imgMap.markerActive) {
      this.imgMap.markerActive--;
    }
    this.imgMap.draw();
  }

  constructor(private fb: FormBuilder,
              private floorService: FloorService,
              private updateService: UpdateConnectorService,
              private connectorService: ConnectorService) {
    this.connectorForm = fb.group({
      'title': ['Connector title', Validators.required],
      'description' : ['Connector description'],
      'isInFloor'  : ['Connector floor'],
      'numberOfPorts' : ['Number of Ports'],
      'latitude'  : ['Connector latitude'],
      'longitude'  : ['Connector longitude']
    });
    this.titleCtrl = this.connectorForm.controls['title'];
    this.connector = new Connector();
  }

  ngOnInit() {
    this.floorService.getAllFloors().subscribe(
      floors => {
        this.floors = floors;
        if (this.floor) {
          this.connector.isInFloor = this.floor.uri;
          this.connectorForm.get('isInFloor').disable();
        }
        },
      error => this.errorMessage = <any>error.message
    );
  }

  onSubmit(): void {
    this.connector.latitude = this.markers[0][0];
    this.connector.longitude = this.markers[0][1];
    this.connectorService.addConnector(this.connector)
      .subscribe(
        connector => {
          this.updateService.announceConnector(connector);
          this.showForm = false;
          },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
    this.connector = new Connector;
    if (this.floor) {
      this.connector.isInFloor = this.floor.uri;
    }
  }
}
