import { createConnection, Connection } from 'typeorm'
import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { Action, RoutingControllersOptions, useExpressServer } from 'routing-controllers'
import { Container } from 'inversify'
import IPathologyService from './domain/interfaces/services/IPathologyService'
import PathologyService from './infra/services/PathologyService'
import PathologyRepository from './infra/repositories/PathologyRepository'
import IPathologyRepository from './domain/interfaces/repositories/IPathologyRepository'
import { InversifyAdapter } from './IoC'
import { useContainer } from 'routing-controllers/container'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import { Signale } from 'signale'

class Startup {
    private express: express.Application;
    private routingOptions: RoutingControllersOptions;
    private container: Container;
    private inversifyAdapter: InversifyAdapter;
    public server: express.Application;
    public log: Signale

    public constructor () {
      this.express = express();
      this.container = new Container()
      this.log = this.Logger();
      this.middlewares();
      this.containerRegister()
      this.database()
      this.router();
      this.server = useExpressServer(this.express, this.routingOptions);
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      this.express.use(morgan("dev"));
      this.express.use(bodyParser.json({ limit: "1mb" }));
      this.express.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
      this.express.use(compression());
    }

    private Logger (): Signale {
      const options = {
        disabled: false,
        interactive: false,
        logLevel: 'info',
        scope: 'prologyc',
        secrets: [],
        stream: process.stdout,
      };
    
      return new Signale(options);
    }

    private containerRegister (): void  {
      this.container.bind<IPathologyService>('PathologyService').to(PathologyService);
      this.container.bind<IPathologyRepository>('PathologyRepository').to(PathologyRepository);
      this.inversifyAdapter = new InversifyAdapter(this.container);
      useContainer(this.inversifyAdapter);
    }

    private authorization (action: Action, roles: string[]) {
      // const token = action.request.headers['authorization'];
      // const user = await getEntityManager().findOneByToken(User, token);
      // if (roles[0] == "roles") return true;
      // if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;
      return true; 
    }

    private currentUser (action: Action) {
      // const token = action.request.headers['authorization'];
      // return getEntityManager().findOneByToken(User, token); 
      return false;
    }

    private router () {
      this.routingOptions = {
        cors: true,
        routePrefix: '/api',
        controllers: [__dirname + '/api/controllers/*.ts'],
        middlewares: [__dirname + '/api/middlewares/*.ts'],
        interceptors: [__dirname + '/api/interceptors/*.ts'],
        validation: true,
        defaultErrorHandler: true,
        authorizationChecker: this.authorization,
        currentUserChecker: this.currentUser,
      };
    } 

    private async database (): Promise<Connection> {
      const connection = await createConnection()
      return connection
    }
}

export default new Startup()