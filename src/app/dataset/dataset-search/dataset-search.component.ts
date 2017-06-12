import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DatasetService } from '../dataset.service';
import { Dataset } from '../dataset';
import { ActivatedRoute } from '@angular/router';
import { DataFileService } from '../datafile/datafile.service';


@Component({
  selector: 'app-dataset-search',
  templateUrl: './dataset-search.component.html',
  styleUrls: ['./dataset-search.component.css']
})

export class DatasetsSearchComponent {
  @Input()
  datasets: Dataset[];
  @Input()
  totalDatasets: number;
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();
  private schema: string = null;

  public errorMessage: string;
  constructor(private datasetService: DatasetService,
              private datafileService: DataFileService,
              private route: ActivatedRoute) {
  }

  performSearch(searchTerm: string): void {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id != null) { this.schema = `/schemas/${id}`; }
      });
    this.datasetService.getDatasetByDescriptionWords(searchTerm, this.schema).subscribe(
      datasets => {
        // Send to output emitter
        // this.onSearchited.emit(datasets);
        this.datafileService.getDatafileByDescriptionWords(searchTerm, this.schema).subscribe(
          datafiles => {
            this.onSearchited.emit(datasets.concat(datafiles));
          },
          error => this.errorMessage = <any>error.message
        );
      },
      empty => {
        this.datafileService.getDatafileByDescriptionWords(searchTerm, this.schema).subscribe(
          datafiles => {
            this.onSearchited.emit(datafiles);
          },
          error => this.errorMessage = <any>error.message
        );
      }
    );
  }
}

