import { injectable } from 'inversify';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { BadRequest } from '../operation-result/http-status/BadRequest';
import { Forbidden } from '../operation-result/http-status/Forbidden';
import { NotFound } from '../operation-result/http-status/NotFound';
import { TokenError } from '../operation-result/http-status/TokenError';
import { Unauthorized } from '../operation-result/http-status/Unauthorized';

@Middleware({ type: 'after' })
@injectable()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any) {

    const badRequestErrorHandler = (error: BadRequest) => {
      const custom = response.status(error.HttpCode).send(error)
      next(custom);
    }

    const unauthorizedUser = (error: Unauthorized | TokenError) => {
      const custom = response.status(error.HttpCode).send(error)
      next(custom);
    }

    const forbiddenUser = (error: Forbidden) => {
      const custom = response.status(error.HttpCode).send(error)
      next(custom);
    }

    const notFoundUser = (error: NotFound) => {
      const custom = response.status(error.HttpCode).send(error)
      next(custom);
    }

    const objectErrorHandler = {
      400: (error: BadRequest) => badRequestErrorHandler(error),
      401: (error: Unauthorized | TokenError) => unauthorizedUser(error),
      403: (error: Forbidden) =>  forbiddenUser(error),
      404: (error: NotFound) =>  notFoundUser(error)
    }

    error.HttpCode 
    ? objectErrorHandler[error.HttpCode](error)
    : objectErrorHandler[400](new BadRequest([error.message, ...error?.errors]));
    
  }
} 