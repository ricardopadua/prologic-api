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
const routing_controllers_1 = require("routing-controllers");
const inversify_1 = require("inversify");
const UpdatePathologyRequest_1 = __importDefault(require("../requests/Pathology/UpdatePathologyRequest"));
const Roles_1 = require("../../domain/enums/Roles");
const CreatePathologyRequest_1 = __importDefault(require("../requests/Pathology/CreatePathologyRequest"));
const FindOnePathologyRequest_1 = __importDefault(require("../requests/Pathology/FindOnePathologyRequest"));
const FindAllPathologyRequest_1 = __importDefault(require("../requests/Pathology/FindAllPathologyRequest"));
const RemovePathologyRequest_1 = __importDefault(require("../requests/Pathology/RemovePathologyRequest"));
const Types_1 = require("../../Types");
let PathologysController = class PathologysController {
    constructor(_handle) {
        this._handle = _handle;
    }
    findAll(request) {
        return this._handle.SendCommand(request);
    }
    findOne(id) {
        return this._handle.SendCommand(new FindOnePathologyRequest_1.default(id));
    }
    createPathology(request) {
        return this._handle.SendCommand(request);
    }
    updatePathology(id, request) {
        return this._handle.SendCommand(request);
    }
    removePathology(id) {
        return this._handle.SendCommand(new RemovePathologyRequest_1.default(id));
    }
};
__decorate([
    routing_controllers_1.Authorized([Roles_1.Roles.Admin, Roles_1.Roles.Manager, Roles_1.Roles.User]),
    routing_controllers_1.Get('/'),
    __param(0, routing_controllers_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindAllPathologyRequest_1.default]),
    __metadata("design:returntype", void 0)
], PathologysController.prototype, "findAll", null);
__decorate([
    routing_controllers_1.Authorized([Roles_1.Roles.Admin, Roles_1.Roles.Manager, Roles_1.Roles.User]),
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.OnUndefined(404),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PathologysController.prototype, "findOne", null);
__decorate([
    routing_controllers_1.Authorized([Roles_1.Roles.Admin, Roles_1.Roles.Manager, Roles_1.Roles.Guest]),
    routing_controllers_1.Post('/'),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePathologyRequest_1.default]),
    __metadata("design:returntype", void 0)
], PathologysController.prototype, "createPathology", null);
__decorate([
    routing_controllers_1.Authorized([Roles_1.Roles.Admin, Roles_1.Roles.Manager]),
    routing_controllers_1.Put('/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePathologyRequest_1.default]),
    __metadata("design:returntype", void 0)
], PathologysController.prototype, "updatePathology", null);
__decorate([
    routing_controllers_1.Authorized([Roles_1.Roles.Guest]),
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(204),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PathologysController.prototype, "removePathology", null);
PathologysController = __decorate([
    inversify_1.injectable(),
    routing_controllers_1.JsonController('/pathology'),
    __param(0, inversify_1.inject(Types_1.TYPES.PathologyRequestHandler)),
    __metadata("design:paramtypes", [Object])
], PathologysController);
exports.default = PathologysController;
//# sourceMappingURL=PathologysController.js.map