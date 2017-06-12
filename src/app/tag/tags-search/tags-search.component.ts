import { Component, Input, EventEmitter, Output } from '@angular/core';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {TagService} from '../tag.service';


@Component({
  selector: 'app-tags-search',
  templateUrl: './tags-search.component.html',
  styleUrls: ['./tags-search.component.css']
})

export class TagsSearchComponent {
  @Input()
  tags: Tag[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;
  constructor(private tagService: TagService) {
  }

  performSearch(searchTerm: string): void {
    this.tagService.getTagByNameWords(searchTerm).subscribe(
      tags => {
        // Send to output emitter
        this.onSearchited.emit(tags);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
