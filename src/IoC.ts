import 'reflect-metadata';
import { IocAdapter, Action, useContainer, ClassConstructor } from 'routing-controllers';
import { Container } from 'inversify';
import IPathologyService from './domain/interfaces/services/IPathologyService';
import PathologyService from './infra/services/PathologyService';
import PathologyRepository from './infra/repositories/PathologyRepository';
import IPathologyRepository from './domain/interfaces/repositories/IPathologyRepository';
import PathologyRequestHandler, { IPathologyRequestHandler } from './api/request-handlers/PathologyRequestHandler';
import IUserRepository from './domain/interfaces/repositories/IUserRepository';
import UserRepository from './infra/repositories/UserRepository';
import UserRequestHandler, { IUserRequestHandler } from './api/request-handlers/UserRequestHandler';
import { IOperationResult, OperationResult } from './api/operation-result/OperationResult';

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
    this.container.bind<IOperationResult>('OperationResult').to(OperationResult);
    this.container.bind<IPathologyService>('PathologyService').to(PathologyService);
    this.container.bind<IPathologyRepository>('PathologyRepository').to(PathologyRepository);
    this.container.bind<IPathologyRequestHandler>('PathologyRequestHandler').to(PathologyRequestHandler);
    this.container.bind<IUserRepository>('UserRepository').to(UserRepository);
    this.container.bind<IUserRequestHandler>('UserRequestHandler').to(UserRequestHandler);
    this.inversifyAdapter = new Adapter(this.container);
    useContainer(this.inversifyAdapter);
  }
}

export default new IoC()