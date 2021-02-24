import { IocAdapter } from 'routing-controllers';
import { Container } from 'inversify';
import { Action } from 'routing-controllers';
import { ClassConstructor } from 'routing-controllers';

export class InversifyAdapter implements IocAdapter {
  constructor(private readonly container: Container) {}

  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    const childContainer = this.container.createChild();
    childContainer.bind('127.0.0.1').toConstantValue('127.0.0.1');
    return childContainer.resolve<T>(someClass);
  }
}

export default { InversifyAdapter };