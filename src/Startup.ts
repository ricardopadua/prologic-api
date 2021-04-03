import 'reflect-metadata';
import { Action, RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { createConnection, getRepository } from 'typeorm';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import morgan from 'morgan';
import compression from 'compression';
import { Signale } from 'signale';
import helmet from 'helmet';
import swagger from '../Swagger';
import IoC from './IoC';
import { Forbidden } from './api/operation-result/http-status/Forbidden';
import { User } from './domain/entities/User';
import { TokenError } from './api/operation-result/http-status/TokenError';
import environment from '../config'
import * as bcrypt from "bcryptjs";

const { url, serve, setup } = swagger.Build();

class Startup {
  private Express: express.Application;
  private RoutingOptions: RoutingControllersOptions;
  public Server: express.Application;
  public Log: Signale

  public constructor() {
    IoC.ContainerRegister();
    this.Express = express();
    this.Logger();
    this.Router();
    this.Middlewares();
    this.Database();
    this.Server = useExpressServer(this.Express, this.RoutingOptions);
  }

  private Middlewares(): void {
    this.Express.use(express.json())
    this.Express.use(cors())
    this.Express.use(morgan(environment.express.morganFormat));
    this.Express.use(bodyParser.json({ limit: environment.express.bodyParserLimit }));
    this.Express.use(bodyParser.urlencoded({ limit: environment.express.bodyParserLimit, extended: false }));
    this.Express.use(compression());
    this.Express.use(helmet());
    this.Express.use(cookieParser());
    this.Express.use(environment.express.staticRoute, serveStatic(__dirname + environment.express.staticFolder));
    this.Express.use(url, serve, setup);
  }

  private Logger(): void {
    let _signale = new Signale(environment.signale.object)
    _signale.config(environment.signale.config);
    this.Log = _signale;
  }

  private Router() {
    this.RoutingOptions = environment.routingOptions(__dirname, this.Authorization);
  }

  private async Database() {
    return await createConnection();
  }

  private async Authorization(action: Action, roles: string[]) {

    const verifyUserToken = (action: Action) => {
      const token = action.request.headers['authorization'].split('Bearer ')[1];
      const secret: string = environment.express.secret;
      const decoded: any = jwt.verify(token, secret, function (err, decoded) {
        if (err) throw new TokenError(err.name, [err.message]);
        return decoded;
      });
      return decoded;
    } 

    const verifyUserRoles = async (data: any, roles: string[]) => {
      const user = await getRepository(User)
        .createQueryBuilder()
        .select(["nickname", "role"])
        .where("nickname = :nickname", { nickname: data.data.nickname })
        .execute();
  
      if (user.length === 0) throw new TokenError<string>('UserError', ['nickname not found for any users']);
  
      if (!roles.find(role => bcrypt.compareSync(role, user[0].role) === true))
        throw new Forbidden<string>([...roles.map((i) => `User without permission for role ${i}`)]);
  
      return true;
    }

    const token = verifyUserToken(action);
    const rolesIsValid = await verifyUserRoles(token, roles);
    return rolesIsValid;
  }
}

export default new Startup();