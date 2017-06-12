import { CommentService } from '../../app/comment/comment.service';
import { SpyObject } from '../helper';

export class MockCommentService extends SpyObject {
  fakeResponse;
  getAllComments;
  getComment;
  addComment;

  constructor() {
    super(CommentService);

    this.fakeResponse = null;
    this.getAllComments = this.spy('getAllComments').andReturn(this);
    this.getComment = this.spy('getComment').andReturn(this);
    this.addComment = this.spy('addComment').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
    return [{ provide: CommentService, useValue: this }];
  }
}
