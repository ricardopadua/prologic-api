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
const Pathology_1 = __importDefault(require("../../domain/entities/Pathology"));
const Types_1 = require("../../Types");
let PathologyRequestHandler = class PathologyRequestHandler {
    constructor(_operationResult, _repository) {
        this._operationResult = _operationResult;
        this._repository = _repository;
    }
    SendCommand(request) {
        const Handle = {
            UpdatePathologyRequest: (request) => this.UpdatePathologyRequestHandle(request),
            CreatePathologyRequest: (request) => this.CreatePathologyRequestHandle(request),
            FindOnePathologyRequest: (request) => this.FindOnePathologyRequestHandle(request),
            FindAllPathologyRequest: (request) => this.FindAllPathologyRequestHandle(request),
            RemovePathologyRequest: (request) => this.RemovePathologyRequestHandle(request),
        };
        return Handle[`${request.constructor.name}`](request);
    }
    UpdatePathologyRequestHandle(request) {
        return this._repository.update(request);
    }
    async CreatePathologyRequestHandle(request) {
        const pathology = new Pathology_1.default(request.CID, request.Description);
        const createdPathology = await this._repository.create(pathology);
        return this._operationResult.Created([createdPathology]);
    }
    FindOnePathologyRequestHandle(request) {
        return this._repository.findOne(request.Id);
    }
    FindAllPathologyRequestHandle(request) {
        return this._repository.findAll(request);
    }
    RemovePathologyRequestHandle(request) {
        return this._repository.remove(request.Id);
    }
};
PathologyRequestHandler = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.TYPES.OperationResult)),
    __param(1, inversify_1.inject(Types_1.TYPES.PathologyRepository)),
    __metadata("design:paramtypes", [Object, Object])
], PathologyRequestHandler);
exports.default = PathologyRequestHandler;
//# sourceMappingURL=PathologyRequestHandler.js.map