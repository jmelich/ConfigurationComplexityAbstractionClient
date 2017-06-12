import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../dataset.service';
import { Dataset } from '../dataset';
import { OwnerService } from '../../user/owner.service';
import { TagService } from '../../tag/tag.service';

@Component({
  selector: 'app-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.css']
})
export class DatasetsListComponent implements OnInit {
  public datasets: Dataset[] = [];
  public datasetOwners: {} = {};
  public errorMessage: string;
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage = 20;

  constructor(private datasetService: DatasetService,
              private ownerService: OwnerService,
              private tagService: TagService) {
  }

  onSearch(datasets) {
    this.datasets = datasets;
  }

  ngOnInit() {
    this.getDatasets(0, this.itemsPerPage);
  }

  public getDatasets(page: number, size: number) {
    this.datasetService.getAllDatasetsOrderedByTitlePaginated(page, size).subscribe(
      pageWrapper => {
        this.datasets = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.datasets.forEach(dataset => {
          this.ownerService.getOwner(dataset._links.owner.href).subscribe(
            owner => this.datasetOwners[dataset.uri] = owner.getUserName()
          );
          this.tagService.getTagsOfDataset(dataset.uri).subscribe(
            tags => dataset.tags = tags
          );
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }

  onChange(sizeValue) {
    this.itemsPerPage = sizeValue;
    this.getDatasets(0, sizeValue);
    this.setPage(1);
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page - 1);
    this.getDatasets(event.page - 1, this.itemsPerPage);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
