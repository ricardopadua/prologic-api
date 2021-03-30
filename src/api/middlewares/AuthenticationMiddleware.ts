import { injectable } from 'inversify';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import app from '../../Startup'
import { Unauthorized } from '../operation-result/http-status/Unauthorized';
import { NotFound } from '../operation-result/http-status/NotFound';

var url = require("url");

@injectable()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  // todo
  use(request: any, response: any, next?: (err?: any) => any): void {
    const token = request.headers['authorization'];
    const urlIsValid = request.url !== '/api/auth/register' && request.url !== '/api/auth/login';
    const tokenExist = token ? (token.split(' ')[0] === 'Bearer' && token.split(' ')[1] !== undefined) : false;
    
    if(urlIsValid && !tokenExist) next(new Unauthorized([])); 


    // jwt.verify(token, 'shhhhh', function(err, decoded) {
    //   if (err) {
    //     new TokenExpiredError();
    //       err = {
    //         httpCode: 401,
    //         name: 'TokenExpiredError',
    //         message: 'jwt expired',
    //         expiredAt: 1408621000
    //       }
        
    //   }
    // });
       next(); 
  }
}
