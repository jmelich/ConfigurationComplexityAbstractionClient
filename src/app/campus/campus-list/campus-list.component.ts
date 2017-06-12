import { Component, OnInit } from '@angular/core';
import { CampusService } from '../campus.service';
import { Campus } from '../campus';

@Component({
  selector: 'app-campus-list',
  templateUrl: './campus-list.component.html',
  styleUrls: ['./campus-list.component.css']
})
export class CampusListComponent implements OnInit {
  public campuses: Campus[] = [];
  public errorMessage: string;

  constructor(private campusService: CampusService) { }

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
