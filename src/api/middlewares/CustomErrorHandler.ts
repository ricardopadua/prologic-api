import { injectable } from 'inversify';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { NotFoundError } from '../errors/NotFoundError';

@Middleware({ type: 'after' })
@injectable()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('do something...', error);
    const custom = response.status(error.httpCode).send({
      status: false,
      name: error.name,
      mensage:  error.message
      
  })

    next(custom);
  }
}