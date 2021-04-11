"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const PathologyService_1 = __importDefault(require("./infra/services/PathologyService"));
const PathologyRepository_1 = __importDefault(require("./infra/repositories/PathologyRepository"));
const PathologyRequestHandler_1 = __importDefault(require("./api/request-handlers/PathologyRequestHandler"));
const UserRepository_1 = __importDefault(require("./infra/repositories/UserRepository"));
const UserRequestHandler_1 = __importDefault(require("./api/request-handlers/UserRequestHandler"));
const OperationResult_1 = require("./api/operation-result/OperationResult");
const config_1 = __importDefault(require("../config"));
const Types_1 = require("./Types");
const Adapter = class {
    constructor(container) {
        this.container = container;
    }
    get(someClass, action) {
        const childContainer = this.container.createChild();
        childContainer
            .bind(config_1.default.ioc.childContainerBind)
            .toConstantValue(config_1.default.ioc.childContainerBind);
        return childContainer.resolve(someClass);
    }
};
class IoC {
    constructor() {
        this.container = new inversify_1.Container();
        this.inversifyAdapter = new Adapter(this.container);
        routing_controllers_1.useContainer(this.inversifyAdapter);
    }
    ContainerRegister() {
        this.RegisterRequestHandler();
        this.RegisterServices();
        this.RegisterRepository();
        this.RegisterMiddlewares();
    }
    RegisterMiddlewares() {
        this.container.bind(Types_1.TYPES.OperationResult).to(OperationResult_1.OperationResult);
    }
    RegisterRequestHandler() {
        this.container.bind(Types_1.TYPES.UserRequestHandler).to(UserRequestHandler_1.default);
        this.container
            .bind(Types_1.TYPES.PathologyRequestHandler)
            .to(PathologyRequestHandler_1.default);
    }
    RegisterServices() {
        this.container.bind(Types_1.TYPES.PathologyService).to(PathologyService_1.default);
    }
    RegisterRepository() {
        this.container.bind(Types_1.TYPES.UserRepository).to(UserRepository_1.default);
        this.container.bind(Types_1.TYPES.PathologyRepository).to(PathologyRepository_1.default);
    }
}
exports.default = new IoC();
//# sourceMappingURL=IoC.js.map