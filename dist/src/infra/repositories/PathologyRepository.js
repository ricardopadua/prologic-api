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
const typeorm_1 = require("typeorm");
const Pathology_1 = __importDefault(require("../../domain/entities/Pathology"));
let PathologyRepository = class PathologyRepository {
    constructor(context) {
        this._context = context;
        this._context = typeorm_1.getRepository(Pathology_1.default);
    }
    /**
     * sample documentation
     * @param skip param sample doc
     * @param take param sample doc
     * @returns return sample doc
     */
    async findAll(request) {
        return await this._context.find(request.pagination());
    }
    async findOne(id) {
        return await this._context.findOne(id);
    }
    async create(pathology) {
        return await this._context.save(pathology);
    }
    async update(pathology) {
        const result = await this._context
            .createQueryBuilder()
            .update(Pathology_1.default)
            .set({ CID: pathology.CID, Description: pathology.Description })
            .where('id = :id', { id: pathology.Id })
            .execute();
        return result;
    }
    async remove(id) {
        return await this._context.delete(id);
    }
};
PathologyRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PathologyRepository);
exports.default = PathologyRepository;
//# sourceMappingURL=PathologyRepository.js.map