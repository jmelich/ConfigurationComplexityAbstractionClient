import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../schema.service';
import { Dataset } from '../../dataset/dataset';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datasets-list',
  templateUrl: '../../dataset/datasets-list/datasets-list.component.html',
  styleUrls: ['../../dataset/datasets-list/datasets-list.component.css']
})
export class SchemasDatasetListComponent implements OnInit {
  public datasets: Dataset[] = [];
  public errorMessage: string;
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage = 20;

  constructor(private schemaService: SchemaService,
              private route: ActivatedRoute) { }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/schemas/${id}`;
        this.schemaService.getDatasetsOfSchema(uri).subscribe(
          datasets => { this.datasets = datasets; },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
