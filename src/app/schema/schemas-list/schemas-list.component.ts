import {Component, OnInit} from '@angular/core';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';
import {OwnerService} from '../../user/owner.service';

@Component({
  selector: 'app-schemas-list',
  templateUrl: './schemas-list.component.html',
  styleUrls: ['./schemas-list.component.css']
})
export class SchemasListComponent implements OnInit {
  public schemas: Schema[] = [];
  public schemaOwners: {} = {};
  public errorMessage: string;
  public currentPage = 1;
  public maxSize = 5;
  public bigTotalItems: number;
  public itemsPerPage = 20;

  constructor(private schemaService: SchemaService,
              private ownerService: OwnerService) {
  }

  onSearch(schemas) {
    this.schemas = schemas;
  }

  ngOnInit() {
    this.getSchemas(0, this.itemsPerPage);
  }

  public getSchemas(page: number, size: number) {
    this.schemaService.getAllSchemasPaginated(page, size).subscribe(
      pageWrapper => {
        this.schemas = pageWrapper.elements;
        this.bigTotalItems = pageWrapper.pageInfo.totalElements;
        this.itemsPerPage = pageWrapper.pageInfo.size;
        this.schemas.forEach(schema => {
          this.ownerService.getOwner(schema._links.owner.href).subscribe(
            owner => {
              this.schemaOwners[schema.uri] = owner.getUserName();
            });
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }

  onChange(sizeValue) {
    this.itemsPerPage = sizeValue;
    this.getSchemas(0, sizeValue);
    this.setPage(1);
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    this.setPage(event.page - 1);
    this.getSchemas(event.page - 1, this.itemsPerPage);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
