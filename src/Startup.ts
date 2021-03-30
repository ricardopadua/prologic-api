import { Action, RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { createConnection, Connection, getRepository } from 'typeorm';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import IoC  from './IoC';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import morgan from 'morgan';
import compression from 'compression';
import { Signale } from 'signale';
import helmet from 'helmet';
import swagger from '../Swagger';
import { Forbidden } from './api/operation-result/http-status/Forbidden';
import { User } from './domain/entities/User';
import config  from 'config';
import jwt from 'jsonwebtoken';
import { TokenError } from './api/operation-result/http-status/TokenError';
const { url, serve, setup } = swagger.Build();

class Startup {
    private express: express.Application;
    private routingOptions: RoutingControllersOptions;
    public server: express.Application;
    public log: Signale

    public constructor () {
      this.express = express();
      IoC.containerRegister();
      this.log = this.Logger();
      this.router();
      this.middlewares();
      this.database()
      this.server = useExpressServer(this.express, this.routingOptions);
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      this.express.use(morgan("dev"));
      this.express.use(bodyParser.json({ limit: "2mb" }));
      this.express.use(bodyParser.urlencoded({ limit: "2mb", extended: false }));
      this.express.use(compression());
      this.express.use(helmet());
      this.express.use(cookieParser());
      this.express.use(serveStatic(__dirname + '../public'));
      this.express.use(url, serve, setup);
    }

    private Logger (): Signale {
      let _signale = new Signale({
        disabled: false,
        interactive: false,
        stream: process.stdout,
      });

      _signale.config({
        displayFilename: true,
        displayTimestamp: true,
        displayDate: false
      });
    return _signale;
    }

    private async authorization (action: Action, roles: string[]) {
      const token = action.request.headers['authorization'].split('Bearer ')[1];
      const secret: string = config.get('expressSessionOptions.secret');
      const decoded: any = jwt.verify(token, secret, function(err, decoded) {
        if (err) throw new TokenError(err.name, err.message, [err.message]);
        return decoded;
        });

      const user = await getRepository(User)
      .createQueryBuilder()
      .select(["nickname", "role"])
      .where("nickname = :nickname", { nickname: decoded.data })
      .execute();

      if (user.length === 0) throw new TokenError('UserError', 'Nickname not found', ['nickname not found for any users']);

      if (!roles.find(role => user.filter((i: any) => i.role === role).length > 0))
        throw new Forbidden([roles.map((i) => `User without permission for role ${i}`)]);
      
      return true;
    }

    private router () {
      this.routingOptions = {
        cors: true,
        routePrefix: '/api',
        controllers: [__dirname + '/api/controllers/*.ts'],
        middlewares: [__dirname + '/api/middlewares/*.ts'],
        interceptors: [__dirname + '/api/interceptors/*.ts'],
        validation: true,
        defaultErrorHandler: false,
        authorizationChecker: this.authorization,
      };
    }

    private async database (): Promise<Connection> {
      const connection = await createConnection()
      return connection
    }
}

export default new Startup()