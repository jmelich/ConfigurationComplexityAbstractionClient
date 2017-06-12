import { CommentFormComponent } from './comment-form.component';
import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { Comment } from '../comment';
import { AppComponent } from '../../app.component';
import { MockCommentService } from '../../../test/mocks/comment.service';
import { CommentService } from '../comment.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { MockAuthenticationBasicService } from '../../../test/mocks/authentication-basic.service';
import { MockOwnerService } from '../../../test/mocks/owner.service';
import { OwnerService } from '../../user/owner.service';
import { Owner } from '../../user/owner';
import { User } from '../../login-basic/user';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  const comment = new Comment({
    'uri': '/comments/1',
    'text': 'First Comment',
    '_links': {
      'owner': { 'href': 'http://localhost/comments/1/owner' }
    }
  });
  const user = new User({
    'username': 'user'
  });
  const owner = new Owner({
    'uri': 'dataOwners/owner'
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CommentFormComponent, CommentDetailsComponent],
      providers: [
        {provide: CommentService, useClass: MockCommentService},
        {provide: AuthenticationBasicService, useClass: MockAuthenticationBasicService},
        {provide: OwnerService, useClass: MockOwnerService}],
      imports: [RouterTestingModule.withRoutes([
        {path: 'comments/new', component: CommentFormComponent},
        {path: 'comments/:id', component: CommentDetailsComponent}]),
        FormsModule, ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should submit new comment', async(
    inject([Router, Location, CommentService, OwnerService, AuthenticationBasicService],
      (router, location, service, ownerService, authentication) => {
      TestBed.createComponent(AppComponent);
      service.setResponse(comment);
      ownerService.setResponse(owner);
      authentication.isLoggedIn.and.returnValue(true);
      authentication.getCurrentUser.and.returnValue(user);

      router.navigate(['/comments/new']).then(() => {
        expect(location.path()).toBe('/comments/new');
        expect(service.getComment).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(CommentFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;
        expect(component.comment.text).toBeUndefined();

        const compiled = fixture.debugElement.nativeElement;
        const inputText = compiled.querySelector('#text');
        const form = compiled.querySelector('form');
        const button = compiled.querySelector('button');

        inputText.value = 'First Comment';
        inputText.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(button.disabled).toBeFalsy();
        form.dispatchEvent(new Event('submit'));

        expect(component.comment.text).toBe('First Comment');
        expect(service.addComment).toHaveBeenCalledTimes(1);
        expect(service.addComment.calls.mostRecent().object.fakeResponse.text).toBe('First Comment');
      });
    })
  ));

  it('should warn if input for name is left empty', async(
    inject([Router, Location, CommentService], (router, location, service) => {
      TestBed.createComponent(AppComponent);

      router.navigate(['/comments/new']).then(() => {
        expect(location.path()).toBe('/comments/new');
        expect(service.getComment).toHaveBeenCalledTimes(0);

        fixture = TestBed.createComponent(CommentFormComponent);
        fixture.detectChanges();
        component = fixture.debugElement.componentInstance;

        const compiled = fixture.debugElement.nativeElement;
        const input = compiled.querySelector('#text');
        const button = compiled.querySelector('button');

        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        expect(component.comment.text).toBe('');
        expect(component.textCtrl.hasError('required')).toBeTruthy();
        expect(component.textCtrl.touched).toBeTruthy();
        expect(compiled.querySelector('.label-warning').innerHTML.trim()).toBe('A text is required');
        expect(button.disabled).toBeTruthy();
      });
    })
  ));
});

