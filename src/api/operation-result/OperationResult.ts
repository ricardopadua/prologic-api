import { injectable } from "inversify";
import { BadRequest } from "./http-status/BadRequest";
import { Forbidden } from "./http-status/Forbidden";
import { HttpCreated } from "./http-status/HttpCreated";
import { HttpOk } from "./http-status/HttpOk";
import { NotFound } from "./http-status/NotFound";
import { Unauthorized } from "./http-status/Unauthorized";

export interface IOperationResult {
  Ok(data?: any[]): HttpOk;
  Created(data?: any[]): HttpCreated;
  BadRequest(data?: any[]): BadRequest;
  Unauthorized(data?: any[]): Unauthorized;
  Forbidden(data?: any[]): Forbidden;
  NotFound(data?: any[]): NotFound;
}

@injectable()
export class OperationResult implements IOperationResult {
    constructor() {

    }

    public Ok(data?: any[]): HttpOk {
        return new HttpOk(data || []);
      }

    public Created(data?: any[]): HttpCreated {
        return new HttpCreated(data || []);
      }

    public BadRequest(data?: any[]): BadRequest {
        return new BadRequest(data || []);
      }

    public Unauthorized(data?: any[]): Unauthorized {
        return new Unauthorized(data || []);
      }

    public Forbidden(data?: any[]): Forbidden {
        return new Forbidden(data || []);
      }

    public NotFound(data?: any[]): NotFound {
        return new NotFound(data || []);
      }

  }