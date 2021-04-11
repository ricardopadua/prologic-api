"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Unauthorized_1 = require("../operation-result/http-status/Unauthorized");
const config_1 = __importDefault(require("../../../config"));
const TokenError_1 = require("../operation-result/http-status/TokenError");
const typeorm_1 = require("typeorm");
const User_1 = require("../../domain/entities/User");
let AuthenticationMiddleware = class AuthenticationMiddleware {
    async use(request, response, next) {
        const token = request.headers['authorization'];
        const urlIsValid = request.url !== '/management/info' &&
            request.url !== '/management/metrics' &&
            request.url !== '/management/health' &&
            request.url.includes('/public') &&
            request.url !== '/api/auth/register' &&
            request.url !== '/api/auth/login';
        const tokenExist = token
            ? token.split(' ')[0] === 'Bearer' && token.split(' ')[1] !== undefined
            : false;
        if (urlIsValid && !tokenExist)
            next(new Unauthorized_1.Unauthorized([]));
        token &&
            jsonwebtoken_1.default.verify(token.split(' ')[1], config_1.default.express.secret, function (err, decoded) {
                if (err)
                    throw new TokenError_1.TokenError(err.name, [err.message]);
                return decoded;
            });
        if (request.body.email &&
            request.body.password &&
            request.body.client_secret &&
            request.url === '/api/auth/login') {
            const userIsInactive = await typeorm_1.getRepository(User_1.User)
                .createQueryBuilder()
                .select(['active'])
                .where('email = :email', { email: request.body.email })
                .andWhere('active = :active', { active: false })
                .execute();
            if (userIsInactive.length > 0)
                next(new Unauthorized_1.Unauthorized(['Invalid user.', 'User is inactive.']));
        }
        next();
    }
};
AuthenticationMiddleware = __decorate([
    inversify_1.injectable(),
    routing_controllers_1.Middleware({ type: 'before' })
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=AuthenticationMiddleware.js.map