import { HttpResultBase } from './HttpResultBase';

export class TokenError<T> extends HttpResultBase<T> {
  constructor(name: string, error: T[]) {
    super(401, name, 'There was a problem with your authorization.', error);
  }
}
