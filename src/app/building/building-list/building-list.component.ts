import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../building.service';
import { Building } from '../building';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  public buildings: Building[] = [];
  public errorMessage: string;

  constructor(private buildingService: BuildingService) { }

  onSearch(buildings) {
    this.buildings = buildings;
  }

  ngOnInit() {
    this.buildingService.getAllBuildings().subscribe(
      buildings => { this.buildings = buildings; },
      error => this.errorMessage = <any>error.message
    );
  }
}
