"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const config_1 = __importDefault(require("../../../config"));
const User_1 = require("../../domain/entities/User");
const Types_1 = require("../../Types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserRequestHandler = class UserRequestHandler {
    constructor(_operationResult, _repository) {
        this._operationResult = _operationResult;
        this._repository = _repository;
    }
    SendCommand(request) {
        const Handle = {
            PaginatedRequest: (request) => this.UserFindAllRequestHandle(request),
            UserLoginRequest: (request) => this.UserLoginRequestHandle(request),
            UserLogoutRequest: (request) => this.UserLogoutRequestHandle(request),
            UserRegisterRequest: (request) => this.UserRegisterRequestHandle(request),
        };
        return Handle[`${request.constructor.name}`](request);
    }
    UserFindAllRequestHandle(request) {
        return this._repository.FindAll(request.Limit, request.Page);
    }
    async UserLoginRequestHandle(request) {
        const userExist = await this._repository.Exist(request.Email);
        if (!userExist)
            return this._operationResult.BadRequest(['Invalid credentials.', 'User doesn´t exist.']);
        const userCredentialsIsValid = await this._repository.Authenticate(request.Email, request.Password);
        if (!userCredentialsIsValid)
            return this._operationResult.Unauthorized(['Invalid credentials.', 'Password is not Match.']);
        const user = await this._repository.FindOne(request.Email);
        const token = jsonwebtoken_1.default.sign({
            data: {
                nickname: user.Nickname,
                roles: user.Role,
                avatar: user.Avatar,
            },
        }, config_1.default.express.secret, { expiresIn: 900 });
        return { token: token };
    }
    UserLogoutRequestHandle(request) {
        return this._operationResult.Ok();
    }
    async UserRegisterRequestHandle(request) {
        const emailIsValid = !(await this._repository.Exist(request.Email));
        if (!emailIsValid)
            return this._operationResult.BadRequest([`The email ${request.Email} is already in use.`]);
        const user = new User_1.User(request.FirstName, request.LastName, request.Email, null, request.Password);
        const userRegistered = await this._repository.Register(user);
        return this._operationResult.Created([userRegistered]);
    }
};
UserRequestHandler = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.TYPES.OperationResult)),
    __param(1, inversify_1.inject(Types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UserRequestHandler);
exports.default = UserRequestHandler;
//# sourceMappingURL=UserRequestHandler.js.map