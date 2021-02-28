import 'reflect-metadata';
import { IocAdapter, Action, useContainer, ClassConstructor } from 'routing-controllers';
import { Container } from 'inversify';
import IPathologyService from './domain/interfaces/services/IPathologyService';
import PathologyService from './infra/services/PathologyService';
import PathologyRepository from './infra/repositories/PathologyRepository';
import IPathologyRepository from './domain/interfaces/repositories/IPathologyRepository';

const Adapter = class implements IocAdapter {
  constructor(private readonly container: Container) {}

  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    const childContainer = this.container.createChild();
    childContainer.bind('127.0.0.1').toConstantValue('127.0.0.1');
    return childContainer.resolve<T>(someClass);
  }
}

class IoC {
  private container: Container;
  private inversifyAdapter: IocAdapter;

  public constructor () {
    this.container = new Container()
  }

  public containerRegister (): void  {
    this.container.bind<IPathologyService>('PathologyService').to(PathologyService);
    this.container.bind<IPathologyRepository>('PathologyRepository').to(PathologyRepository);
    this.inversifyAdapter = new Adapter(this.container);
    useContainer(this.inversifyAdapter);
  }
}

export default new IoC()