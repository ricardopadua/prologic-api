import { injectable } from 'inversify';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import app from '../../Startup'

@injectable()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  // todo

  use(request: any, response: any, next?: (err?: any) => any): void {
    app.log.error('unauthenticated user');
    app.log.error('User not found');
    app.log.error('incorrect password');
    
    next(); 
  }
}
