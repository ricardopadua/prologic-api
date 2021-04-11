import { HttpResultBase } from './HttpResultBase';

export class BadRequest<T> extends HttpResultBase<T> {
  constructor(error: any[]) {
    super(400, 'BadRequestError', 'The server cannot or will not process the your request.', error);
  }
}
