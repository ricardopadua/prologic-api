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
exports.typeUserService = void 0;
const inversify_1 = require("inversify");
const Pathology_1 = __importDefault(require("../../domain/entities/Pathology"));
exports.typeUserService = Symbol.for('UserService');
const Types_1 = require("../../Types");
let PathologyService = class PathologyService {
    constructor(repository) {
        this._repository = repository;
    }
    /**
     * sample documentation
     * @param skip param sample doc
     * @param take param sample doc
     * @returns return sample doc
     */
    async sampleInjectableRepositoryPathology() {
        return await this._repository.findOne(1);
    }
    async verifyPathologyExisitsInHealthcareApi() {
        return Promise.resolve(new Pathology_1.default('eeeeeeeee', 'fffffffffffffff'));
    }
};
PathologyService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.TYPES.PathologyRepository)),
    __metadata("design:paramtypes", [Object])
], PathologyService);
exports.default = PathologyService;
//# sourceMappingURL=PathologyService.js.map