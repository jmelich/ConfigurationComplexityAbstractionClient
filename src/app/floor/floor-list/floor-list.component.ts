import { Component, OnInit } from '@angular/core';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {
  public floors: Floor[] = [];
  public errorMessage: string;

  constructor(private floorService: FloorService) { }

  onSearch(floors) {
    this.floors = floors;
  }

  ngOnInit() {
    this.floorService.getAllFloors().subscribe(
      floors => { this.floors = floors; },
      error => this.errorMessage = <any>error.message
    );
  }
}
