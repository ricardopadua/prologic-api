import { injectable } from 'inversify';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import { Unauthorized } from '../operation-result/http-status/Unauthorized';
import environment from '../../../config';
import { TokenError } from '../operation-result/http-status/TokenError';
import { getRepository } from 'typeorm';
import { User } from '../../domain/entities/User';

@injectable()
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  async use(request: any, response: any, next?: (err?: any) => any): Promise<void> {
    const token = request.headers['authorization'];
    const urlIsValid =
      request.url !== '/management/info' &&
      request.url !== '/management/metrics' &&
      request.url !== '/management/health' &&
      request.url.includes('/public') &&
      request.url !== '/api/auth/register' &&
      request.url !== '/api/auth/login';
    const tokenExist = token
      ? token.split(' ')[0] === 'Bearer' && token.split(' ')[1] !== undefined
      : false;

    if (urlIsValid && !tokenExist) next(new Unauthorized([]));

    token &&
      jwt.verify(token.split(' ')[1], environment.express.secret, function (err, decoded) {
        if (err) throw new TokenError(err.name, [err.message]);
        return decoded;
      });

    if (
      request.body.email &&
      request.body.password &&
      request.body.client_secret &&
      request.url === '/api/auth/login'
    ) {
      const userIsInactive = await getRepository(User)
        .createQueryBuilder()
        .select(['active'])
        .where('email = :email', { email: request.body.email })
        .andWhere('active = :active', { active: false })
        .execute();

      if (userIsInactive.length > 0) next(new Unauthorized(['Invalid user.', 'User is inactive.']));
    }
    next();
  }
}
