"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorHandler = void 0;
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const BadRequest_1 = require("../operation-result/http-status/BadRequest");
let CustomErrorHandler = class CustomErrorHandler {
    error(error, request, response, next) {
        const badRequestErrorHandler = (error) => {
            const custom = response.status(error.HttpCode).send(error);
            next(custom);
        };
        const unauthorizedUser = (error) => {
            const custom = response.status(error.HttpCode).send(error);
            next(custom);
        };
        const forbiddenUser = (error) => {
            const custom = response.status(error.HttpCode).send(error);
            next(custom);
        };
        const notFoundUser = (error) => {
            const custom = response.status(error.HttpCode).send(error);
            next(custom);
        };
        const objectErrorHandler = {
            400: (error) => badRequestErrorHandler(error),
            401: (error) => unauthorizedUser(error),
            403: (error) => forbiddenUser(error),
            404: (error) => notFoundUser(error),
        };
        error.HttpCode === undefined &&
            objectErrorHandler[400](new BadRequest_1.BadRequest([error.message]));
        objectErrorHandler[error.HttpCode](error);
    }
};
CustomErrorHandler = __decorate([
    routing_controllers_1.Middleware({ type: 'after' }),
    inversify_1.injectable()
], CustomErrorHandler);
exports.CustomErrorHandler = CustomErrorHandler;
//# sourceMappingURL=CustomErrorHandler.js.map