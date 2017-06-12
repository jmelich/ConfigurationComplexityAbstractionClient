import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  public comments: Comment[] = [];
  public errorMessage: string;

  constructor(private commentService: CommentService) { }

  onSearch(comments) {
    this.comments = comments;
  }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(
      comments => { this.comments = comments; },
      error => this.errorMessage = <any>error.message
    );
  }
}
