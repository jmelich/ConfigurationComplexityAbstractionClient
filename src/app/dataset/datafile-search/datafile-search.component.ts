import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { DataFile } from '../datafile/datafile';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '../dataset.service';

@Component({
  selector: 'app-datafile-search',
  templateUrl: 'datafile-search.component.html',
  styleUrls: ['datafile-search.component.css']
})
export class DatafilesSearchComponent {
  @Input()
  datafiles: DataFile[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  private schema: string = null;

  public errorMessage: string;

  constructor(private datasetService: DatasetService,
              private route: ActivatedRoute) {
  }


  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.schema = `/schemas/${id}`; }
      });
    this.datasetService.getDatasetByDescriptionWords(searchTerm, this.schema).subscribe(
      datafiles => {
        // Send to output emitter
        this.onSearchited.emit(datafiles);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
