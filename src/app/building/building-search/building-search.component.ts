import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Building} from '../building';
import {BuildingService} from '../building.service';

@Component({
  selector: 'app-building-search',
  templateUrl: 'building-search.component.html',
  styleUrls: ['building-search.component.css']
})
export class BuildingSearchComponent {
  @Input()
  buildings: Building[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  private building: string = null;

  public errorMessage: string;

  constructor(private buildingService: BuildingService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.building = `/buildings/${id}`; }
      });
    this.buildingService.getBuildingsByTitleContaining(searchTerm).subscribe(
      buildings => {
        // Send to output emitter
        this.onSearchited.emit(buildings);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
