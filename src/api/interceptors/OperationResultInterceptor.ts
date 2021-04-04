import { injectable } from 'inversify';
import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import { HttpCreated } from '../operation-result/http-status/HttpCreated';

@injectable()
@Interceptor()
export class OperationResultInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    content.constructor === HttpCreated && action.response.status(201);
    return content;
  }
}
