import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { CommentDetailsComponent } from './comment-details.component';
import { Comment } from '../comment';
import { AppComponent } from '../../app.component';
import { CommentService } from '../comment.service';
import { MockCommentService } from '../../../test/mocks/comment.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { OwnerService } from '../../user/owner.service';
import { MockOwnerService } from '../../../test/mocks/owner.service';
import { Owner } from '../../user/owner';
import { User } from '../../login-basic/user';

describe('CommentDetailsComponent', () => {
  let fixture: ComponentFixture<CommentDetailsComponent>;
  let component: CommentDetailsComponent;

  const comment1 = new Comment({
    'uri': '/comments/1',
    'text': 'First comment',
    '_links': {
      'owner': { 'href': 'http://localhost/comments/1/owner' }
    }
  });
  const comment2 = new Comment({
    'uri': '/comments/2',
    'text': 'Second comment',
    '_links': {
      'owner': { 'href': 'http://localhost/comments/2/owner' }
    }
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CommentDetailsComponent],
      providers: [
        {provide: CommentService, useClass: MockCommentService},
        {provide: OwnerService, useClass: MockOwnerService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
      ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'comments/:id', component: CommentDetailsComponent}
      ])],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should fetch and render the requested comment', async(
    inject([Router, Location, CommentService, OwnerService, AuthenticationBasicService],
      (router, location, service, ownerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(comment1);
      ownerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(new User({'username': 'owner'}));

      router.navigate(['/comments/1']).then(() => {
        expect(location.path()).toBe('/comments/1');
        expect(service.getComment).toHaveBeenCalledWith('/comments/1');
        expect(ownerService.getOwner).toHaveBeenCalledWith('http://localhost/comments/1/owner');

        fixture = TestBed.createComponent(CommentDetailsComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.comment.text).toBe('First comment');
        expect(component.isOwner).toBe(true);

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('p')[0].innerHTML).toBe('First comment');
      });
    })
  ));
});
