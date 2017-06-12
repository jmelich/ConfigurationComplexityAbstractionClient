import {Authority} from './authority';

export class User {
  username = '';
  authorities: Authority[] = [];
  authorization = '';
  password = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
