import { Action, RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { createConnection, Connection, getRepository } from 'typeorm';
import config  from 'config';
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import IoC  from './IoC';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveStatic from 'serve-static';
import expressSession from 'express-session';
import morgan from 'morgan';
import compression from 'compression';
import { Signale } from 'signale';
import passport, { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import { User } from './domain/entities/User';
//  const JwtStrategy = passportJWT.Strategy;
//  const ExtractJwt = passportJWT.ExtractJwt;

class Startup {
    private express: express.Application;
    private passport: PassportStatic;
    private routingOptions: RoutingControllersOptions;
    private expressSessionOptions: expressSession.SessionOptions;
    private cookieSessionOptions:  CookieSessionInterfaces.CookieSessionOptions
    private jwtStrategy = passportJWT.Strategy;
    private extractJwt = passportJWT.ExtractJwt;
    private passaport: passport.PassportStatic
    public server: express.Application;
    public log: Signale

    public constructor () {
      this.express = express();
      this.passport = passport;
      IoC.containerRegister();
      this.log = this.Logger();
      this.expressSession();
      this.cookieSession()
      this.middlewares();
      this.database() 
      this.router();
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
      this.express.use(expressSession(this.expressSessionOptions));
      // this.express.use(cookieSession(this.cookieSessionOptions));
      // this.express.set('trust proxy', 1);
      // this.passport.use(this.StrategiesForJwt());ls
      this.express.use(this.passport.initialize());
      this.express.use(this.passport.session());
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

    private authorization (action: Action, roles: string[]) {
      const token = action.request.headers['authorization'];

      const user = getRepository(User).findOneByToken(User, token);
      if (user && !roles.length) return true;
      if (user && roles.find(r => user.role.indexOf(r) !== -1)) return true;
  
      return false;
    }

    private currentUser (action: Action) {
      const token = action.request.headers['authorization'];
      return getRepository(User).findOneByToken(User, token); 
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
        defaultErrorHandler: false,
        authorizationChecker: this.authorization,
        currentUserChecker: this.currentUser,
      };
    } 

    private expressSession () {
      this.expressSessionOptions = { 
        secret: config.get('expressSessionOptions.secret'), 
        resave: true, 
        name : 'sessionId',
        saveUninitialized: true, 
        cookie: { maxAge: 60 * 60 * 1000 } };  // 1 hour  
    } 

    private cookieSession () {
      this.cookieSessionOptions = { 
        name: 'session',
        keys: ['key1', 'key2'],
        secure: true,
        httpOnly: true,
        domain: config.get('cookieSessionOptions.domain'),
        path: config.get('cookieSessionOptions.path'),
        expires: new Date( Date.now() + 60 * 60 * 1000 ) // 1 hour  
      } 
    }

    private async database (): Promise<Connection> {
      const connection = await createConnection()
      return connection
    }
}

export default new Startup()