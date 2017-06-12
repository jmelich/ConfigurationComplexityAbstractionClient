import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockCommentService } from '../../../test/mocks/comment.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CommentListComponent } from './comment-list.component';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  const comment1 = new Comment({
    'uri': '/comments/1',
    'text': 'First Comment'
  });
  const comment2 = new Comment({
    'uri': '/comments/2',
    'text': 'Second Comment'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, CommentListComponent ],
      providers: [ { provide: CommentService, useClass: MockCommentService } ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'comments', component: CommentListComponent }
      ])],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  it('should fetch and render all comments', async(
    inject([Router, Location, CommentService], (router, location, service) => {
      TestBed.createComponent(AppComponent);
      service.setResponse([comment1, comment2]);

      router.navigate(['/comments']).then(() => {
        expect(location.path()).toBe('/comments');
        expect(service.getAllComments).toHaveBeenCalled();

        fixture = TestBed.createComponent(CommentListComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.comments[0].text).toBe('First Comment');
        expect(component.comments[1].text).toBe('Second Comment');

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.panel-heading')[0].innerHTML).toContain('First Comment');
        expect(compiled.querySelectorAll('.panel-heading')[1].innerHTML).toContain('Second Comment');
      });
    })
  ));
});

