import { Component, Input, OnInit } from '@angular/core';
import { BuildingService } from '../building.service';
import { Building } from '../building';
import { Campus } from '../../campus/campus';
import { UpdateBuildingService } from '../update.building.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  public buildings: Building[] = [];
  @Input() campus: Campus;
  public errorMessage: string;

  constructor(private buildingService: BuildingService,
              private updateService: UpdateBuildingService) {
    updateService.addedBuilding$.subscribe(
      building => {
        this.buildings.push(building);
      }
    );
  }

  onSearch(buildings) {
    this.buildings = buildings;
  }

  ngOnInit() {
    if ( this.campus !== undefined ) {
      this.buildingService.getBuildingsOfCampus(this.campus.uri).subscribe(
        buildings => { this.buildings = buildings; },
        error => this.errorMessage = <any>error.message
      );
    }else {
      this.buildingService.getAllBuildings().subscribe(
        buildings => { this.buildings = buildings; },
        error => this.errorMessage = <any>error.message
      );
    }

  }
}
