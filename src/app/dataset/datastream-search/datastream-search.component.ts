/**
 * Created by SergiGrau on 3/6/17.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataStream } from '../datastream/datastream';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '../dataset.service';

@Component({
  selector: 'app-datastream-search',
  templateUrl: 'datastream-search.component.html',
  styleUrls: ['datastream-search.component.css']
})
export class DatastreamsSearchComponent {
  @Input()
  datastreams: DataStream[];
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
        if (id != null) {
          this.schema = `/schemas/${id}`;
        }
      });
    this.datasetService.getDatasetByDescriptionWords(searchTerm, this.schema).subscribe(
      datastreams => {
        // Send to output emitter
        this.onSearchited.emit(datastreams);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
