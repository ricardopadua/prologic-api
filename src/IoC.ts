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
import environment from '../config'
import { TYPES } from './Types';

const Adapter = class implements IocAdapter {
  constructor(private readonly container: Container) {}

  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    const childContainer = this.container.createChild();
    childContainer.bind(environment.ioc.childContainerBind)
    .toConstantValue(environment.ioc.childContainerBind);
    return childContainer.resolve<T>(someClass);
  }
}

class IoC {
  private container: Container;
  private inversifyAdapter: IocAdapter;

  public constructor () {
    this.container = new Container()
    this.inversifyAdapter = new Adapter(this.container);
    useContainer(this.inversifyAdapter);
  }

  public ContainerRegister (): void  {
    this.RegisterRequestHandler();
    this.RegisterServices();
    this.RegisterRepository();
    this.RegisterMiddlewares();
  }

  private RegisterMiddlewares (): void  {
    this.container.bind<IOperationResult>(TYPES.OperationResult).to(OperationResult);
  }

  private RegisterRequestHandler (): void  {
    this.container.bind<IUserRequestHandler>(TYPES.UserRequestHandler).to(UserRequestHandler);
    this.container.bind<IPathologyRequestHandler>(TYPES.PathologyRequestHandler).to(PathologyRequestHandler);
  }

  private RegisterServices (): void  {
    this.container.bind<IPathologyService>(TYPES.PathologyService).to(PathologyService);
  }

  private RegisterRepository (): void  {
    this.container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    this.container.bind<IPathologyRepository>(TYPES.PathologyRepository).to(PathologyRepository);
  }
}

export default new IoC();