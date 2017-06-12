import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FieldService} from '../field.service';
import {Field} from '../field';

@Component({
  selector: 'app-fields-search',
  templateUrl: 'fields-search.component.html',
  styleUrls: ['fields-search.component.css']
})
export class FieldSearchComponent {
  @Input()
  fields: Field[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;

  constructor(private fieldService: FieldService) {
  }


  performSearch(searchTerm: string): void {
    this.fieldService.getFieldByDescriptionWords(searchTerm).subscribe(
      fields => {
        // Send to output emitter
        this.onSearchited.emit(fields);
      },
      error => this.errorMessage = <any>error.message
    );
  }

}
