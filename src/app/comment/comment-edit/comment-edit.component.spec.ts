import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CommentEditComponent } from './comment-edit.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';
import { AppComponent } from '../../app.component';
import { CommentService } from '../comment.service';
import { MockCommentService } from '../../../test/mocks/comment.service';
import { Comment } from '../comment';
import { LoggedInGuard } from '../../login-basic/loggedin.guard';
import { Router } from '@angular/router';

describe('CommentEditComponent', () => {
  let component: CommentEditComponent;
  let fixture: ComponentFixture<CommentEditComponent>;

  const response = new Comment({
    'uri': '/comments/1',
    'text': 'First comment',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, CommentEditComponent, CommentDetailsComponent ],
      providers: [ { provide: CommentService, useClass: MockCommentService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'comments/:id/edit', component: CommentEditComponent, canActivate: [LoggedInGuard] } ]),
        FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  it('the edit component should be created and load the comment to be edited', () => {
    inject([Router, Location, CommentService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(response);

      router.navigate(['/comments/1/edit']).then(() => {
        expect(location.path()).toBe('/comments/1/edit');
        expect(service.getComment).toHaveBeenCalledTimes(1);

        fixture = TestBed.createComponent(CommentEditComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        expect(component.comment.text).toBe('First comment');
      });
    });
  });
});

