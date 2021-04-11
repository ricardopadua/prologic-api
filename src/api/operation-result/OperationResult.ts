import { injectable } from 'inversify';
import { BadRequest } from './http-status/BadRequest';
import { Forbidden } from './http-status/Forbidden';
import { HttpCreated } from './http-status/HttpCreated';
import { HttpOk } from './http-status/HttpOk';
import { NotFound } from './http-status/NotFound';
import { Unauthorized } from './http-status/Unauthorized';

export interface IOperationResult {
  Ok<T>(data?: T[]): HttpOk<T>;
  Created<T>(data?: T[]): HttpCreated<T>;
  BadRequest<T>(data?: T[]): BadRequest<T>;
  Unauthorized<T>(data?: T[]): Unauthorized<T>;
  Forbidden<T>(data?: T[]): Forbidden<T>;
  NotFound<T>(data?: T[]): NotFound<T>;
}

@injectable()
export class OperationResult implements IOperationResult {
  constructor() {}

  public Ok<T>(data?: T[]): HttpOk<T> {
    return new HttpOk<T>(data ?? []);
  }

  public Created<T>(data?: T[]): HttpCreated<T> {
    return new HttpCreated<T>(data ?? []);
  }

  public BadRequest<T>(data?: T[]): BadRequest<T> {
    return new BadRequest<T>(data ?? []);
  }

  public Unauthorized<T>(data?: T[]): Unauthorized<T> {
    return new Unauthorized<T>(data ?? []);
  }

  public Forbidden<T>(data?: T[]): Forbidden<T> {
    return new Forbidden<T>(data ?? []);
  }

  public NotFound<T>(data?: T[]): NotFound<T> {
    return new NotFound<T>(data ?? []);
  }
}
