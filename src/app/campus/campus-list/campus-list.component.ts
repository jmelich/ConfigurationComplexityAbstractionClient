import { Component, OnInit } from '@angular/core';
import { CampusService } from '../campus.service';
import { Campus } from '../campus';

import { UpdateCampusService } from '../update.campus.service';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css']
})
export class CampusListComponent implements OnInit {
  public campuses: Campus[] = [];
  public errorMessage: string;

  constructor(private campusService: CampusService,
              private updateService: UpdateCampusService) {
    updateService.addedCampus$.subscribe(
      campus => {
        this.campuses.push(campus);
      }
    );
  }

  onSearch(campuses) {
    this.campuses = campuses;
  }

  ngOnInit() {
    this.campusService.getAllCampuses().subscribe(
      campuses => { this.campuses = campuses; },
      error => this.errorMessage = <any>error.message
    );
  }
}
