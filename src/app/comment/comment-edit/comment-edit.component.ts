import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  public comment: Comment = new Comment();
  public errorMessage: string;
  public commentForm: FormGroup;
  public textCtrl: AbstractControl;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private router: Router) {
    this.commentForm = fb.group({
      'text': ['Comment text', Validators.required]
    });
    this.textCtrl = this.commentForm.controls['text'];
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/comments/${id}`;
        this.commentService.getComment(uri).subscribe(
          comment => this.comment = comment,
          error => this.errorMessage = <any>error.message,
        );
      });
  }

  onSubmit(): void {
    this.commentService.updateComment(this.comment)
      .subscribe(
        comment => { this.router.navigate([comment.uri]); },
        error => {
          this.errorMessage = error.errors ? <any>error.errors[0].message : <any>error.message;
        });
  }
}
