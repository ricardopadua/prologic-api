import { HttpResultBase } from './HttpResultBase';

export class HttpOk<T> extends HttpResultBase<T> {
  constructor(data: T[]) {
    super(200, 'Created', 'The request was successful.', []);
    this.Status = true;
    this.Data = data;
  }

  public Data: T[];
}
