
import "reflect-metadata";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Action, useExpressServer } from "routing-controllers";
import IPathologyService from "./domain/interfaces/services/IPathologyService";
import { useContainer } from "routing-controllers";
import { InversifyAdapter } from "./IoC";
import { Container } from "inversify";
import IPathologyRepository from "./domain/interfaces/repositories/IPathologyRepository";
import { createConnection } from "typeorm";
import PathologyService from "./infra/services/PathologyService";
import PathologyRepository from "./infra/repositories/PathologyRepository";
 

const chalk = require('chalk');
let compression = require("compression");

const authorization = async (action: Action, roles: string[]) => {
  // const token = action.request.headers['authorization'];
  // const user = await getEntityManager().findOneByToken(User, token);
  // if (roles[0] == "roles") return true;
  // if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;
  return true;
};

const currentUser = async (action: Action) => {
  // const token = action.request.headers['authorization'];
  // return getEntityManager().findOneByToken(User, token); 
  return false;
};


const container = new Container();

container.bind<IPathologyService>('PathologyService').to(PathologyService);
container.bind<IPathologyRepository>('PathologyRepository').to(PathologyRepository);

const inversifyAdapter = new InversifyAdapter(container);

useContainer(inversifyAdapter);

let express = require('express'); 
let app = express(); 

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.use(compression());

app.use((req: any, res: { header: (arg0: string, arg1: string) => void; setHeader: (arg0: string, arg1: boolean) => void; }, next: () => void) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Filename, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

createConnection().then(async connection => {
  useExpressServer(app, {
    cors: true,
    routePrefix: '/api',
    controllers: [__dirname + '/api/controllers/*.ts'],
    middlewares: [__dirname + '/api/middlewares/*.ts'],
    interceptors: [__dirname + '/api/interceptors/*.ts'],
    validation: true,
    defaultErrorHandler: true,
    authorizationChecker: authorization,
    currentUserChecker: currentUser,
  }).listen(3000);
}).catch(error => console.log(error));

console.log(chalk.blue("run express application on port 3000"));