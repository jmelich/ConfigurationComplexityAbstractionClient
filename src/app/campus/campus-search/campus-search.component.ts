import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campus } from '../campus';
import { CampusService } from '../campus.service';

@Component({
  selector: 'app-campus-search',
  templateUrl: 'campus-search.component.html',
  styleUrls: ['campus-search.component.css']
})
export class CampusSearchComponent {
  @Input()
  campuses: Campus[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  private campus: string = null;

  public errorMessage: string;

  constructor(private campusService: CampusService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.campus = `/campuses/${id}`; }
      });
    this.campusService.getCampusesByTitleContaining(searchTerm).subscribe(
      campuses => {
        // Send to output emitter
        this.onSearchited.emit(campuses);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
