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
const routing_controllers_1 = require("routing-controllers");
const Roles_1 = require("../../domain/enums/Roles");
const UserRegisterRequest_1 = __importDefault(require("../requests/User/UserRegisterRequest"));
const routing_controllers_2 = require("routing-controllers");
const UserLoginRequest_1 = __importDefault(require("../requests/User/UserLoginRequest"));
const Types_1 = require("../../Types");
const UserLogoutRequest_1 = __importDefault(require("../requests/User/UserLogoutRequest"));
let AuthenticationController = class AuthenticationController {
    constructor(_handle) {
        this._handle = _handle;
    }
    Login(request) {
        return this._handle.SendCommand(request);
    }
    Logout(request = new UserLogoutRequest_1.default()) {
        return this._handle.SendCommand(request);
    }
    RegisterUser(request) {
        return this._handle.SendCommand(request);
    }
};
__decorate([
    routing_controllers_1.Post('/login'),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginRequest_1.default]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "Login", null);
__decorate([
    routing_controllers_2.Authorized([Roles_1.Roles.User, Roles_1.Roles.Guest]),
    routing_controllers_1.Get('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "Logout", null);
__decorate([
    routing_controllers_1.Post('/register'),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterRequest_1.default]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "RegisterUser", null);
AuthenticationController = __decorate([
    inversify_1.injectable(),
    routing_controllers_1.JsonController('/auth'),
    __param(0, inversify_1.inject(Types_1.TYPES.UserRequestHandler)),
    __metadata("design:paramtypes", [Object])
], AuthenticationController);
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map