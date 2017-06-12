import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  public comment: Comment;
  public commentForm: FormGroup;
  public textCtrl: AbstractControl;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private commentService: CommentService) {
    this.commentForm = fb.group({
      'text': ['Comment text', Validators.required]
    });
    this.textCtrl = this.commentForm.controls['text'];
    this.comment = new Comment();
  }

  ngOnInit() {}

  onSubmit(): void {
    this.commentService.addComment(this.comment)
      .subscribe(
        comment => { this.router.navigate([comment.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
