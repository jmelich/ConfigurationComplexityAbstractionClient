import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { Tag } from '../tag';
import { DatasetService } from '../../dataset/dataset.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {
  public tags: Tag[] = [];
  public errorMessage: string;
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage = 20;

  constructor(private tagService: TagService,
              private datasetService: DatasetService) { }

  onSearch(tags) {
    this.tags = tags;
  }

  ngOnInit() {
    this.getTags(0, this.itemsPerPage);
  }

  public getTags(page: number, size: number) {
    this.tagService.getAllTagsPaginated(page, size).subscribe(
      pageWrapper => {
        this.tags = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.tags.forEach(tag => {
          this.datasetService.getDatasetsByTag(tag.name).subscribe(
            datasets => {
              tag.datasets = datasets;
            }
          );
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }

  onChange(sizeValue) {
    this.itemsPerPage = sizeValue;
    this.getTags(0, sizeValue);
    this.setPage(1);
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page - 1);
    this.getTags(event.page - 1, this.itemsPerPage);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
