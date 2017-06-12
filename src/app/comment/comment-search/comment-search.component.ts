import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';
import {Dataset} from '../../dataset/dataset';


@Component({
  selector: 'app-comment-search',
  templateUrl: './comment-search.component.html',
  styleUrls: ['./comment-search.component.css']
})

export class CommentSearchComponent {
  @Input()
  comments: Comment[];
  @Output()
  onSearchited: EventEmitter<any> = new EventEmitter();

  public errorMessage: string;
  constructor(private commentService: CommentService) {
  }

  performSearch(searchTerm: string): void {
    this.commentService.getCommentByDataset(searchTerm).subscribe(
      comments => {
        // Send to output emitter
        this.onSearchited.emit(comments);
      },
      error => this.errorMessage = <any>error.message
    );
  }
}

