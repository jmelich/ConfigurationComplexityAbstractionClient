import {Component, Input, OnInit} from '@angular/core';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';
import {Building} from '../../building/building';
import {UpdateFloorService} from '../update.floor.service';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {
  public floors: Floor[] = [];
  @Input() building: Building;
  public errorMessage: string;

  constructor(private floorService: FloorService,
              private updateService: UpdateFloorService) {
    updateService.addedFloor$.subscribe(
      floor => {
        this.floors.push(floor);
      }
    );
  }

  onSearch(floors) {
    this.floors = floors;
  }

  ngOnInit() {
    if (this.building !== undefined) {
      this.floorService.getFloorsOfBuilding(this.building.uri).subscribe(
        floors => { this.floors = floors; },
        error => this.errorMessage = <any>error.message
      );
    }else {
      this.floorService.getAllFloors().subscribe(
        floors => {
          this.floors = floors;
          for (let floor of floors) {
            this.floorService.getBuildingOfFloor(floor).subscribe(
              building => {
                floor.isInBuilding = ' (' + building.title + ')';
              });
          }
        },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
