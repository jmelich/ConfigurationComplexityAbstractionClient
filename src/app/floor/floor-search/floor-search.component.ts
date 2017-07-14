import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Floor} from '../floor';
import {FloorService} from '../floor.service';

@Component({
  selector: 'app-floor-search',
  templateUrl: 'floor-search.component.html',
  styleUrls: ['floor-search.component.css']
})
export class FloorSearchComponent {
  @Input()
  floors: Floor[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  private floor: string = null;

  public errorMessage: string;

  constructor(private floorService: FloorService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.floor = `/floors/${id}`; }
      });
    this.floorService.getFloorsByTitleContaining(searchTerm).subscribe(
      floors => {
        // Send to output emitter
        this.onSearchited.emit(floors);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
