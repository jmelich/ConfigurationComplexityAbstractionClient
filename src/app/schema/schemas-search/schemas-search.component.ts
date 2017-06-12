import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SchemaService} from '../schema.service';
import {Schema} from '../schema';

@Component({
  selector: 'app-schemas-search',
  templateUrl: 'schemas-search.component.html',
  styleUrls: ['schemas-search.component.css']
})
export class SchemaSearchComponent {
  @Input()
  schemas: Schema[];
  @Input()
  totalSchemas: number;
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;

  constructor(private schemaService: SchemaService) {
  }


  performSearch(searchTerm: string): void {
    this.schemaService.getSchemaByDescriptionWords(searchTerm).subscribe(
      schemas => {
        // Send to output emitter
        this.onSearchited.emit(schemas);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
